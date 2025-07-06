// Este módulo es el consumidor que escucha los pedidos de la cola de mensajes
// y los procesa para actualizar el inventario real en memoria.

const amqp = require('amqplib');
const { enviarEstado, enviarADespacho } = require('./productor');

// Inventario simulado en memoria
const inventario = {
  Teclado: 10,
  Mouse: 5,
  Monitor: 3,
  Audífonos: 8
};

async function escucharPedidos() {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-inventario');

  console.log('Esperando pedidos en inventario...');

  canal.consume('cola-inventario', async (mensaje) => {
    const pedido = JSON.parse(mensaje.content.toString());
    console.log('Pedido recibido en inventario:', pedido);

    const { id, articulo, cantidad } = pedido;
    const stockDisponible = inventario[articulo] || 0;

    if (stockDisponible >= cantidad) {
      // Reducimos el stock
      inventario[articulo] -= cantidad;
      console.log(`${cantidad} unidad(es) de ${articulo} reservadas. Stock restante: ${inventario[articulo]}`);

      const estado = {
        id,
        paso: 'inventario',
        estado: 'Disponible'
      };

      await enviarEstado(estado);
      await enviarADespacho(pedido);
    } else {
      console.log(`No hay suficiente stock de ${articulo}. Disponibles: ${stockDisponible}`);

      const estado = {
        id,
        paso: 'inventario',
        estado: 'rechazado',
        razon: 'Sin inventario'
      };

      await enviarEstado(estado);
    }

    canal.ack(mensaje);
  });
}

module.exports = { escucharPedidos };

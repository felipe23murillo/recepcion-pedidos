// Este módulo es el consumidor que escucha los pedidos de la cola de mensajes
// y los procesa para actualizar el inventario.


const amqp = require('amqplib');
const { enviarEstado, enviarADespacho } = require('./productor');

async function escucharPedidos() {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-inventario');

  console.log('Esperando pedidos en inventario...');

  canal.consume('cola-inventario', async (mensaje) => {
    const pedido = JSON.parse(mensaje.content.toString());
    console.log('Pedido recibido en inventario:', pedido);

    // Simulamos si hay inventario o no (aleatorio)
    const hayStock = Math.random() > 0.3;

    const estado = {
      id: pedido.id,
      paso: 'inventario',
      estado: hayStock ? 'Disponible' : 'Sin stock'
    };

    await enviarEstado(estado);

    // Si hay stock, lo pasamos a despacho
    if (hayStock) {
      await enviarADespacho(pedido);
    }

    canal.ack(mensaje);
  });
}

module.exports = { escucharPedidos };

// Este módulo es el consumidor que escucha los pedidos de la cola de mensajes
// y los procesa para enviar los pedidos al servicio de despacho.

const amqp = require('amqplib');
const { enviarEstado } = require('./productor');

async function escucharPedidosParaDespacho() {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-despacho');

  console.log('Esperando pedidos para despacho...');

  canal.consume('cola-despacho', async (mensaje) => {
    const pedido = JSON.parse(mensaje.content.toString());
    console.log('Preparando despacho para:', pedido);

    // Simulamos el proceso de preparación
    const estado = {
      id: pedido.id,
      paso: 'despacho',
      estado: 'Pedido listo para enviar'
    };

    await enviarEstado(estado);
    canal.ack(mensaje);
  });
}

module.exports = { escucharPedidosParaDespacho };

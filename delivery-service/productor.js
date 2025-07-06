// Este módulo envía mensajes a la cola de mensajes para comunicar el estado del pedido y enviar el pedido al servicio de despacho.
// Utiliza RabbitMQ como sistema de mensajería.


const amqp = require('amqplib');

// Envía el estado final del pedido a order-service
async function enviarEstado(estado) {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-estado');
  canal.sendToQueue('cola-estado', Buffer.from(JSON.stringify(estado)));
  console.log('Estado enviado a order-service:', estado);
}

module.exports = { enviarEstado };

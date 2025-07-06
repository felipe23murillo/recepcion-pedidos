// Este módulo envía mensajes a la cola de mensajes para comunicar el estado del pedido y enviar el pedido al servicio de despacho.
// Utiliza RabbitMQ como sistema de mensajería.


const amqp = require('amqplib');

// Envia el estado del pedido al order-service
async function enviarEstado(estado) {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-estado');
  canal.sendToQueue('cola-estado', Buffer.from(JSON.stringify(estado)));
  console.log('Estado enviado al order-service:', estado);
}

// Envia el pedido al delivery-service si hay stock
async function enviarADespacho(pedido) {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-despacho');
  canal.sendToQueue('cola-despacho', Buffer.from(JSON.stringify(pedido)));
  console.log('Pedido enviado a despacho:', pedido);
}

module.exports = { enviarEstado, enviarADespacho };

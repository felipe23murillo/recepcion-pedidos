// Este módulo se encarga de enviar pedidos al servicio de inventario
// utilizando RabbitMQ como sistema de mensajería.


const amqp = require('amqplib');

async function enviarPedidoAInventario(pedido) {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-inventario');
  canal.sendToQueue('cola-inventario', Buffer.from(JSON.stringify(pedido)));
  console.log('Pedido enviado al inventario:', pedido);
}

module.exports = { enviarPedidoAInventario };

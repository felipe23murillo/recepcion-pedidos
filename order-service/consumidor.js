//Este módulo se encarga de enviar pedidos al servicio de inventario
// utilizando RabbitMQ como sistema de mensajería.

const amqp = require('amqplib');

async function escucharEstadosDelPedido(idEsperado) {
  const conexion = await amqp.connect('amqp://usuario:clave123@localhost');
  const canal = await conexion.createChannel();
  await canal.assertQueue('cola-estado');

  console.log('Escuchando actualizaciones del pedido...');

  canal.consume('cola-estado', (mensaje) => {
    const estado = JSON.parse(mensaje.content.toString());
    if (estado.id === idEsperado) {
      console.log('Estado del pedido actualizado:', estado);
    }
    canal.ack(mensaje);
  });
}

module.exports = { escucharEstadosDelPedido };

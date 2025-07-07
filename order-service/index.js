// Este módulo se encarga de enviar pedidos al servicio de inventario
// utilizando RabbitMQ como sistema de mensajería.

const { enviarPedidoAInventario } = require('./productor');
const { escucharEstadosDelPedido } = require('./consumidor');

const pedido = {
  id: 18127121,
  articulo: 'Teclado',
  cantidad: 2
};

enviarPedidoAInventario(pedido);
escucharEstadosDelPedido(pedido.id);

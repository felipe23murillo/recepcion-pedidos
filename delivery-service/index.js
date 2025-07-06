// Este módulo es el consumidor que escucha los pedidos de la cola de mensajes
// y los procesa para enviar los pedidos al servicio de despacho.

const { escucharPedidosParaDespacho } = require('./consumidor');
escucharPedidosParaDespacho();

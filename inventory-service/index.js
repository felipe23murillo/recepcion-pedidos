// Este módulo es el consumidor que escucha los pedidos de la cola de mensajes
// y los procesa para actualizar el inventario.

const { escucharPedidos } = require('./consumidor');
escucharPedidos();

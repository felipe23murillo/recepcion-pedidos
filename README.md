# Sistema de recepción de pedidos - Microservicios con RabbitMQ

Este proyecto implementa un sistema distribuido para la recepción de pedidos de una tienda online. Se compone de tres microservicios que se comunican de forma asíncrona mediante colas, usando RabbitMQ como intermediario.

## Servicios

- **order-service**: recibe los pedidos y escucha el estado del proceso completo.
- **inventory-service**: valida si hay stock y responde si el pedido puede continuar.
- **delivery-service**: recibe el pedido si hay inventario y confirma que está listo para envío.

## Requisitos

- Node.js (versión 14 o superior)
- Docker y Docker Compose

## Ejecución de RabbitMQ

Desde la raíz del proyecto, ejecutar:

```
docker-compose up -d
```

La interfaz de gestión de RabbitMQ estará disponible en:

http://localhost:15672  
Usuario: usuario  
Contraseña: clave123

## Cómo ejecutar los servicios

Cada microservicio se ejecuta en una terminal distinta. En cada uno:

```
npm install
npm start
```

Asegúrate de que cada archivo que se conecta a RabbitMQ lo haga directamente con la siguiente URL:

```js
amqp://usuario:clave123@localhost
```

### order-service
Instalar dependencias
npm install

```
cd order-service
npm start
```

- Envía un pedido a inventario.
- Escucha y muestra en consola cada cambio de estado del pedido.

### inventory-service
Instalar dependencias
npm install

```
cd inventory-service
npm start
```

- Recibe el pedido.
- Simula si hay stock (de forma aleatoria).
- Si hay stock, lo envía a delivery-service y notifica el estado a order-service.
- Si no hay stock, notifica el rechazo a order-service.

### delivery-service
Instalar dependencias
npm install

```
cd delivery-service
npm start
```

- Recibe el pedido si fue aprobado por inventario.
- Envía un mensaje final de estado al order-service indicando que el pedido está listo para despacho.

## Iniciar los 3 servicios

```
start start-all.bat


## Pruebas

Cada vez que se ejecuta el order-service se crea un nuevo pedido con un artículo y una cantidad. El inventory-service evalúa si hay stock (aleatoriamente). Esto permite simular los siguientes escenarios:

- Pedido rechazado por falta de inventario.
- Pedido aceptado y enviado a despacho.

El estado del pedido se muestra en consola dentro del order-service.

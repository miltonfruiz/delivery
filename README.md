# Sistema de gestión de pedidos de delivery
## Descripción
Este proyecto es un sistema de gestión de pedidos de delivery que permite a los usuarios registrarse, iniciar sesión, crear, leer, actualizar y eliminar pedidos, restaurantes y elementos del menú.

## Stack
* Node.js
* Express.js
* MongoDB
* Mongoose

## Instalación
1. Clonar el repositorio
2. Instalar las dependencias con `npm install`
3. Configurar la variable de entorno `MONGO_URI` con la cadena de conexión a la base de datos de MongoDB

## Docker
1. Construir la imagen con `docker build -t delivery-system .`
2. Iniciar el contenedor con `docker run -p 5000:5000 delivery-system`

## Endpoints
La siguiente lista muestra los endpoints disponibles:
* **POST /api/auth/register**: registrar un nuevo usuario
* **POST /api/auth/login**: iniciar sesión
* **GET /api/orders**: listar pedidos (requiere autenticación)
* **POST /api/orders**: crear pedido (requiere autenticación)
* **GET /api/orders/:id**: obtener pedido por id (requiere autenticación)
* **PUT /api/orders/:id**: actualizar pedido (requiere autenticación)
* **DELETE /api/orders/:id**: eliminar pedido (requiere autenticación)
* **GET /api/restaurants**: listar restaurantes (requiere autenticación)
* **POST /api/restaurants**: crear restaurante (requiere autenticación)
* **GET /api/restaurants/:id**: obtener restaurante por id (requiere autenticación)
* **PUT /api/restaurants/:id**: actualizar restaurante (requiere autenticación)
* **DELETE /api/restaurants/:id**: eliminar restaurante (requiere autenticación)
* **GET /api/menu-items**: listar elementos del menú (requiere autenticación)
* **POST /api/menu-items**: crear elemento del menú (requiere autenticación)
* **GET /api/menu-items/:id**: obtener elemento del menú por id (requiere autenticación)
* **PUT /api/menu-items/:id**: actualizar elemento del menú (requiere autenticación)
* **DELETE /api/menu-items/:id**: eliminar elemento del menú (requiere autenticación)

## Modelo principal
El modelo principal es el de **Pedido**, que tiene los siguientes campos:
* `customerId`: String
* `restaurantId`: String
* `menuItemIds`: \[String]
* `total`: Number
* `status`: String

## Seguridad
* La autenticación se realiza mediante JSON Web Tokens (JWT)
* Las contraseñas se almacenan cifradas con bcrypt
* Los endpoints que requieren autenticación están protegidos con middleware de autenticación
* Se utilizan headers de seguridad para proteger contra ataques de cross-site scripting (XSS) y cross-site request forgery (CSRF)
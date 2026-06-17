Sistema de Mensajeria en Tiempo Real
Este proyecto consiste en una aplicacion de mensajeria estructurada en arquitectura cliente-servidor utilizando Node.js, Express y Socket.io. Permite la comunicacion simultanea a traves de canales globales y especificacion de canales privados empleando un filtrado avanzado por direccion IP.

Caracteristicas del Proyecto
Servidor de Archivos Estaticos: Desarrollado con Express para servir la interfaz del cliente.

Comunicacion Bidireccional: Implementada mediante WebSockets con Socket.io para asegurar baja latencia.

Canal Global: Difusion de mensajes a todos los clientes interconectados.

Canal Privado Avanzado: Enrutamiento de datos redirigido exclusivamente al destinatario mediante identificacion de su direccion IP en la red de sockets.

Mejora 1 (Contador Dinamico): Interfaz dinamica que actualiza en tiempo real el total de usuarios sincronizados en el servidor.

Mejora 2 (Filtro de Privacidad): Exclusion automatica en el listado de mensajeria privada para aquellos clientes que no hayan completado el registro de su nombre.

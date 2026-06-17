const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let usuarios = [];

function buscarUsuario(id) {
  return usuarios.find((u) => u.id === id);
}

io.on('connection', (socket) => {
  let ipRaw = socket.handshake.address;
  let ip = ipRaw === '::1' ? '127.0.0.1' : ipRaw.replace(/^.*:/, '');

  usuarios.push({ id: socket.id, nombre: "Sin nombre", ip: ip });

  io.emit('actualizar-usuarios', usuarios);

  socket.on('registrar-usuario', (nombre) => {
    const usuario = buscarUsuario(socket.id);
    if (usuario) {
      usuario.nombre = nombre || "Sin nombre";
      io.emit('actualizar-usuarios', usuarios);
    }
  });

  socket.on('mensaje-global', (data) => {
    const emisor = buscarUsuario(socket.id);
    if (emisor) {
      io.emit('mensaje-global', {
        de: emisor.nombre,
        texto: data.texto,
        hora: new Date().toLocaleTimeString()
      });
    }
  });

  socket.on("mensaje-privado-ip", (data) => {
    const emisor = buscarUsuario(socket.id);
    const destino = usuarios.find((u) => u.ip === data.ipDestino);
    
    if (!emisor || !destino) return;
    
    io.to(destino.id).emit("mensaje-privado", {
      de: emisor.nombre,
      ipEmisor: emisor.ip,
      texto: data.texto,
      hora: new Date().toLocaleTimeString()
    });
  });

  socket.on('disconnect', () => {
    usuarios = usuarios.filter((u) => u.id !== socket.id);
    io.emit('actualizar-usuarios', usuarios);
  });
});

server.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
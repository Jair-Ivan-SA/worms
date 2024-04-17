//server.js
const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8080;

let currentUser = 'worms@gmail.com';
let currentPassword = '1234';

// Configuración de sesión
app.use(session({
  secret: 'salsa2023',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Esto debería estar en true si estás en HTTPS
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));
app.use(express.json()); // Agrega este middleware
app.use(express.urlencoded({ extended: true }));

// Rutas
app.get('/login', (req,res) => {
  res.sendFile('login.html', { root: __dirname });
});

app.get('/null', (req, res) => {
  if (req.session.user) {
    let ruta = req.session.route || 'sensores'; // Proporciona una ruta por defecto si no hay ninguna guardada.
    res.redirect('/' + ruta);
  } else {
    res.redirect('/login');
  }
});


app.get('/', (req,res) => {
  if (req.session.user) {
    res.sendFile('Sensores.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});

app.post('/updateCredentials', (req, res) => {
  const { newUsername, newPassword } = req.body;
  // Actualiza las credenciales globales
  currentUser = newUsername;
  currentPassword = newPassword;
  // Puedes agregar aquí validaciones adicionales si es necesario
  res.json({ status: 'ok', message: 'Credenciales actualizadas' });
});


app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (username === currentUser && password === currentPassword) {
    req.session.user = username;
    res.json({ status: 'ok' });
  } else {
    res.json({ status: 'error', message: 'Usuario y/o contraseña incorrectos' });
  }
});


app.get('/logout', (req, res) => {
  req.session.destroy(err => {
      if (err) {
          console.error(err);
          res.send("Error al cerrar sesión");
      } else {
          res.redirect('/login');
      }
  });
});




app.get('/sensores', (req, res) => {
  if (req.session.user) {
    res.sendFile('Sensores.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});


app.get('/actuadores', (req, res) => {
  if (req.session.user) {
    res.sendFile('Actuadores.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});

app.get('/administrador', (req, res) => {
  if (req.session.user) {
    res.sendFile('Administrador.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});


app.get('/registros', (req, res) => {
  if (req.session.user) {
    res.sendFile('Registros.html', { root: __dirname });
  } else {
    res.redirect('/login');
  }
});
// Inicia el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});







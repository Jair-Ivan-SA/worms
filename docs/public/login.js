
//button state
function toggleState(button) {
    button.textContent = button.textContent === "Encendido" ? "Apagado" : "Encendido";
}



// Este código gestiona interacciones en el navegador
function toggleInputs() {
  var checkbox = document.getElementById('toggle-edit');
  var editFields = document.getElementById('edit-fields');
  var credentialForm = document.getElementById('credential-form');
  var staticFields = document.getElementById('static-fields');
  
  if (checkbox.checked) {
      editFields.style.display = 'block';
      credentialForm.style.display='block';
      staticFields.style.display = 'none';
  } else {
      editFields.style.display = 'none';
      credentialForm.style.display='none';
      staticFields.style.display = 'block';
  }
}

function logout() {
  localStorage.removeItem('isAuthenticated');
  window.location.href = '/logout';
}

document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;

  fetch('/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'ok') {
          window.location.href = '/sensores';
          localStorage.setItem('isAuthenticated', 'true');
      } else {
          document.getElementById('login-error-msg').textContent = 'Inicio de sesión fallido';
      }
  })
  .catch((error) => {
      console.error('Error:', error);
  });
});

function redirectTo(page) {
  window.location.href = `/${page}`;
}



updateStatusStyle();

// Actualiza el estilo y texto basado en el estado almacenado en localStorage
function updateStatusStyle() {
  var statusText = document.getElementById('system-status-text');
  var statusContainer = document.getElementById('system-status-container');
  var status = localStorage.getItem('systemStatus') ; // valor por defecto

  statusText.textContent = status;
  if (status === "Encendido") {
    statusText.textContent = "Encendido";
    statusContainer.classList.add('system-status-on');
    statusContainer.classList.remove('system-status-off');
  } else {
    statusText.textContent = "Apagado";
    statusContainer.classList.remove('system-status-on');
    statusContainer.classList.add('system-status-off');
  }
}

// Cambia el estado y actualiza localStorage
function toggleSystemStatus() {
  var statusText = document.getElementById('system-status-text');
  var newState = statusText.textContent === "Encendido" ? "Apagado" : "Encendido";

  localStorage.setItem('systemStatus', newState);
  updateStatusStyle();
}


function updateCredentials(event) {
  event.preventDefault(); // Evita que el formulario se envíe de la manera predeterminada
  var newUsername = document.getElementById('new-username').value;
  var newPassword = document.getElementById('new-password').value;
  var confirmPassword = document.getElementById('confirm-password').value;

  if (newPassword !== confirmPassword) {
    alert('Las contraseñas no coinciden.');
    return;
  }
  
  // Envía una solicitud POST al servidor para actualizar las credenciales
  fetch('/updateCredentials', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ newUsername, newPassword }),
  })
  .then(response => response.json())
  .then(data => {
      if (data.status === 'ok') {
          alert('Credenciales actualizadas con éxito.');
          // Puedes redirigir al usuario o hacer algo más aquí
      } else {
          // Manejar el error
          alert('Hubo un problema al actualizar las credenciales.');
      }
  })
  .catch((error) => {
      console.error('Error:', error);
      alert('Error al enviar la solicitud.');
  });
}










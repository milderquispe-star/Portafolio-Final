const contactForm = document.getElementById('contactForm');
const formResponse = document.getElementById('formResponse');

contactForm.addEventListener('submit', async function (evento) {
  // 1. Detiene el comportamiento por defecto (evita que la página salte a guardar.php)
  evento.preventDefault();

  const btnSubmit = contactForm.querySelector('.btn-submit');
  const textoOriginal = btnSubmit.innerHTML;

  // Bloquea el botón un segundo para evitar envíos duplicados
  btnSubmit.disabled = true;
  btnSubmit.innerHTML = 'Enviando...';

  // 2. Empaqueta automáticamente los campos (nombre, email, mensaje)
  const datosFormulario = new FormData(contactForm);

  try {
    // 3. Envía los datos en segundo plano hacia tu archivo PHP
    const respuesta = await fetch('guardar.php', {
      method: 'POST',
      body: datosFormulario
    });

    const resultado = await respuesta.json();

    // 4. Muestra la respuesta en pantalla sin mover al usuario de sitio
    if (resultado.status === 'success') {
      formResponse.innerHTML = `
        <div class="alert alert-success py-2 mb-0" role="alert">
          ${resultado.message}
        </div>`;
      contactForm.reset(); // Limpia las cajas de texto
    } else {
      formResponse.innerHTML = `
        <div class="alert alert-danger py-2 mb-0" role="alert">
          ${resultado.message}
        </div>`;
    }
  } catch (error) {
    // Si lo pruebas en Live Server (sin PHP), caerá aquí sin romper la página
    formResponse.innerHTML = `
      <div class="alert alert-warning py-2 mb-0" role="alert">
        Error: No se pudo conectar con el servidor.
      </div>`;
  } finally {
    btnSubmit.disabled = false;
    btnSubmit.innerHTML = textoOriginal;
  }
});
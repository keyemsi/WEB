function obtenerHoraPorCiudad() {
  // Obtener la ciudad y el continente ingresados por el usuario
  const ciudad = document.getElementById("ciudad").value;
  const continente = document.getElementById("continente").value;

  // URL de la API WorldTime para la ciudad y el continente especificados
  const url = "http://worldtimeapi.org/api/timezone/" + continente + "/" + ciudad;

  // Crear una instancia del objeto XMLHttpRequest
  const request = new XMLHttpRequest();

  // Abrir una solicitud de GET a la URL de la API
  request.open("GET", url);

  // Configurar el tipo de respuesta esperada
  request.responseType = "json";

  // Manejar la respuesta de la solicitud
  request.onload = function() {
    // Analizar la respuesta JSON
    const data = request.response;

    // Obtener la hora actual de la ciudad y el continente especificados
    const currentTime = data.datetime;

    // Actualizar el contenido del contenedor de hora actual en la página
    document.getElementById("nombre-ciudad").textContent = ciudad + ", " + continente;
    document.getElementById("hora").textContent = currentTime;
  };

  // Enviar la solicitud
  request.send();
}

// Manejar el evento de clic del botón
document.getElementById("boton-hora").addEventListener("click", obtenerHoraPorCiudad);

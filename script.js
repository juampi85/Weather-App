  
const container = document.querySelector('.container');
const resultado = document.getElementById('resultado');
const formulario = document.getElementById('formulario');

window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarTemperatura);
});

function buscarTemperatura(e) {
    e.preventDefault();
    const ciudad = document.getElementById('ciudad').value
    const pais = document.getElementById('pais').value

    datosAPI(ciudad, pais );
};

// Función para consultar la API y devolver el resultado
function datosAPI(ciudad, pais ) {
    // Esta API utiliza una key, por lo que la debo agregar
    const appId = '31b33df22fe2b492d9b74843003438fe';
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
          console.log(datos);
    });
};
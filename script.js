  
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
          mostrarTemperatura(datos);
    });
};

// Función para convertir la temperatura de Kelvin a Grados Centígrados
function kelvinACentigrados(grados) {
    return parseInt( grados - 273.15);
  };

// Función para mostrar las temperaturas en la pantalla
  function mostrarTemperatura(datos) {  
    const { name, main: { temp, temp_max, temp_min } } = datos;
  
    const grados = kelvinACentigrados(temp);
    const min = kelvinACentigrados(temp_max);
    const max = kelvinACentigrados(temp_min);
  
    const nombreCiudad = document.createElement('p');
    nombreCiudad.innerHTML = `Clima en: ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl')
  
    const actual = document.createElement('p');
    actual.innerHTML = `${grados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl')
  
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl')
  
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl')
  
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white')
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
  
    resultado.appendChild(resultadoDiv)
  };
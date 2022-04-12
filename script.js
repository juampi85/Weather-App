const container = document.querySelector(".container");
const resultado = document.getElementById("resultado");
const formulario = document.getElementById("formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarTemperatura);
});

function buscarTemperatura(e) {
  e.preventDefault();
  const ciudad = document.getElementById("ciudad").value;
  const pais = document.getElementById("pais").value;

  // Acá controlo que NO se deje vacío alguno de los renglones
  if (ciudad === "" || pais === "") {
    mensajeError("Ambos campos son obligatorios");
    return;
  }

  datosAPI(ciudad, pais);
}

// Función para consultar la API y devolver el resultado
function datosAPI(ciudad, pais) {
  // Esta API utiliza una key, por lo que la debo agregar
  const appId = "31b33df22fe2b492d9b74843003438fe";
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

  fetch(url)
    .then((respuesta) => {
      return respuesta.json();
    })
    .then((datos) => {
      // console.log(datos);
      limpiarHTML();
      if (datos.cod === "404") {
        mensajeError("Ciudad No Encontrada");
      } else {
        mostrarTemperatura(datos);
      }
    });
}

// Función para convertir la temperatura de Kelvin a Grados Centígrados
function kelvinACentigrados(grados) {
  return parseInt(grados - 273.15);
}

// Función para mostrar las temperaturas en la pantalla
function mostrarTemperatura(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
    sys: {country}
  } = datos;
  
// acá convierto las temperaturas en grados Kelvin a Centígradas
  const grados = kelvinACentigrados(temp);
  const min = kelvinACentigrados(temp_max);
  const max = kelvinACentigrados(temp_min);
  const paisTemp = country;

  const nombreCiudad = document.createElement("p");
  nombreCiudad.innerHTML = `Clima en: ${name} (${country})`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${grados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${max} &#8451;`;
  tempMaxima.classList.add("text-xl");

  const tempMinima = document.createElement("p");
  tempMinima.innerHTML = `Min: ${min} &#8451;`;
  tempMinima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);
  resultadoDiv.appendChild(tempMinima);

  resultado.appendChild(resultadoDiv);
}

// Función para limpiar las temperaturas consultadas previamente
function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// Función para validar que se completen ambos renglones (y con datos válidos)
function mensajeError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");
  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "relative",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
            <strong class="font-bold">ERROR!!!</strong>
            <span class="block sm:inline">${mensaje}</span>
        `;

    container.appendChild(alerta);
    // Acá indico que la alerta solo aparezca 2 segundos
    setTimeout(() => {
      alerta.remove();
    }, 2000);
  }
}

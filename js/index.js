
//Constantes y variables globales
const urlTrending = "https://api.giphy.com/v1/gifs/trending?api_key=6VAaJhv9bxZF3C7yrlKUezd7QrUIF9yc&limit=25&rating=g";
const input = document.querySelector("input");
const btnSearch = document.querySelector("button");
let arrayBtn = [];
let btnText = "";

// Carga de gift trending con el inicio de la pagina.

window.addEventListener('load', () => {

	añadirGif();

})


//Funcion para la carga inicial de elementos gif trending

const añadirGif = () => {
    // crea un nuevo div y añade contenido
    const contenedor = document.createElement("div");
    contenedor.className = "gifs";

  fetch(urlTrending)
  .then (response => response.json()) 
  .then (response => {
  for (let i = 0; i <= 24; i++) {
  const contenedorGif = document.createElement("img");
  contenedorGif.className = "gif";
  contenedorGif.src = response.data[i].images.original.url;
  contenedor.appendChild(contenedorGif);
  // Insertar elementos gif en el html
  }
  document.querySelector("main").appendChild(contenedor);
  })
  .catch(e => {
      console.log(e);
  }) 
  };

  //Funcion para realizar busquedas de gift

  const getSearchText = ()  => {
    
      let texto = document.getElementById("input").value;
      // crea un nuevo div y añade contenido
      const contenedor = document.createElement("div");
      contenedor.className = "gifs";
      const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=6VAaJhv9bxZF3C7yrlKUezd7QrUIF9yc&q=${texto}&limit=25&offset=0&rating=g&lang=en`;
  
  
    fetch(urlSearch)
    .then (response => response.json()) 
    .then (response => {
      if(response.data.length === 0){
				window.alert('Sin resultados para su busqueda');
				return;
			}
      getHistory();
    for (let i = 0; i <= 24; i++) {
    const contenedorGif = document.createElement("img");
    contenedorGif.className = "gif";
    contenedorGif.src = response.data[i].images.original.url;
    contenedor.appendChild(contenedorGif);
    }
    document.querySelector("input").value = "";
    limpiar();
    document.querySelector("main").appendChild(contenedor);
   
    
    })
    .catch(e => {
        console.log(e);
    })
  
  }

  // funcion para limpiar el main antes de insertar una nueva busqueda
  const limpiar = () => {
    document.querySelector("main").innerHTML = "";
  }

// funcion para crear un boton con las ultimas 3 busquedas
  const getHistory = () => {
   
    let texto = document.getElementById("input").value;
    arrayBtn.unshift(texto);

    let lastSearch = arrayBtn.length 
    
    const textBtn = document.createTextNode(arrayBtn[0]);
    const btnHistory = document.createElement("button");
    btnHistory.className = "btn-searchHistory";
    btnHistory.id = "btn-searchHistory";
    btnHistory.appendChild(textBtn);
    document.querySelector("#idBtn-history").appendChild(btnHistory);
    
    const valueBtn = document.getElementsByClassName("btn-searchHistory");

    let btnHijo = document.getElementsByClassName("btn-searchHistory");

    if(arrayBtn.length > 3 ) {
    btnHijo[0].remove();
    };
  }

  // Evento con el que se realiza de nuevo las busquedas de los historiales.
  
  document.querySelector('.btn-div-history').addEventListener("click", (event) => {

    btnText = event.target.innerText;
    
    const getSearchTextBtn = ()  => {

        const contenedor = document.createElement("div");
        contenedor.className = "gifs";
        const urlSearch = `https://api.giphy.com/v1/gifs/search?api_key=6VAaJhv9bxZF3C7yrlKUezd7QrUIF9yc&q=${btnText}&limit=25&offset=0&rating=g&lang=en`;
    
      fetch(urlSearch)
      .then (response => response.json()) 
      .then (response => {
        if(response.data.length === 0){
          window.alert('Sin resultados para su busqueda');
          return;
        }
      for (let i = 0; i <= 24; i++) {
      const contenedorGif = document.createElement("img");
      contenedorGif.className = "gif";
      contenedorGif.src = response.data[i].images.original.url;
      contenedor.appendChild(contenedorGif);
      }
      limpiar();
      document.querySelector("main").appendChild(contenedor);
      
      })
      .catch(e => {
          console.log(e);
      })
      
    }
    getSearchTextBtn();
  })

//Entrega 1°El proyecto es sobre una app web para administrar el recorrido de recoleccion de reciclables.
// se define una clase con atributos de cada vecino y un orden y dia asignado.
// En base al orden y dia se calcula que horario (metodo calcular_tiempo) y barrio (metodo calcular_barrio) y se muestra en un mensaje.
// Por medio de una funcion se cargan los prompt y un ciclo repetitivo para continuar la carga hasta que cambie la condicion.

/* Entrega 2° - se mejora la validacion de las entradas
se agrega array de objetos, donde se almacenan los datos ingresados, luego se ordenan y se ejecutan los metodos
por ultimo se realiza una busqueda de los vecinos que figuran en determinado dia */

/* Entrega 3° - JSON - Storage - DOM - Eventos
Capturo el evento submit, leo desde el DOM el contenido de los campos, instancio el objeto y Cargo en un array de objetos los datos de los vecinos, ejecuto los eventos y
 muestro el resultado en en DOM.Guardo en formato JSON ese array de objetos en el localStorage
Cuando cargo la pagina leo el contenido del localStorage, convierto el objeto a un array de objetos, lo recorro luego lo leo desde el local storage, paso nuevamente a un array de objetos, lo recorro,
ejecuto los metodos y modifico el dom con los resultados.*/

/*Entrega final-
Se agrega una libreria Swett Alert para mensaje de eliminacion con promise para confirmar. Se consume una api de clima api.openweathermap.org, se captura el json y se graba en variables 
cada valor en funcion de la cuidad pasada por parametro y te devuelve el clima. Se usa la libreria Toastify para mostrar el clima de cada recorrido agregado.

*/ 
class recorrido {
       constructor(nombre, apellido, orden, dia) {
        this.nombre = nombre.toUpperCase();
        this.apellido = apellido.toUpperCase();
        this.orden = orden;
        this.dia = dia.toUpperCase();
        this.hora = 0;
        this.horaf = "";
        this.barrio ="";
        this.deltat = 15;
        this.horaini = 0;
        }
      
     calcular_tiempo(){
        
        
            

        let i = this.orden - 1 ;
                   

               if (i<4){
                      this.horaini = "12";
                      this.hora = this.hora + this.deltat * i;
                      this.horaf = this.horaini + ":" + this.hora;
                      return this.horaf;
                      }
               if(i<8 && i>=4 ){
                      this.horaini = "13";
                      this.hora = this.hora + (this.deltat * i ) - 60;
                      return this.horaf = this.horaini + ":" + this.hora;
                      }
               if(i<12 && i>=8 ){
                      this.horaini = "14";
                      this.hora = this.hora + (this.deltat * i) - 120;
                      return this.horaf = this.horaini + ":" + this.hora;
                      }
               if(i<16 && i>=12 ){
                      this.horaini = "15";
                      this.hora = this.hora + (this.deltat *i) - 180;
                      return this.horaf = this.horaini + ":" + this.hora;
                      } 
               if(i<20 && i>=16 ){
                      this.horaini = "16";
                      this.hora = this.hora + (this.deltat * i) - 240;
                      return this.horaf = this.horaini + ":" + this.hora;
                      }
               if(i>20){
                      return this.horaf = "HORARIO SUPERIOR A LAS 16:45 HS DONDE TERMINA EL RECORRIDO, VERIFIQUE!";
                      }     
                             
             

              } 

    calcular_barrio(){
            switch (this.dia){

            case "LUNES":
                this.barrio = "GLEW";
                break;
            case "MARTES":
                this.barrio = "LONGCHAMPS";
                break;
            case "MIERCOLES":
                this.barrio = "BURZACO";
                break;
            case "JUEVES":
                this.barrio = "RAFAEL CALZADA";
                break;
            case "VIERNES":
                this.barrio = "JOSE MARMOL"
                break;
            default:
                this.barrio = "BARRIO SIN ASIGNAR"
                break;
             

            }
            return this.barrio;
    }


    
    }

// declaracion de variables globales

let nombre;
let apellido;
let orden;
let dia;
let lista;
let index;
const apikey ="01da2d50b3438933a21f6da48566f132";
const apiurl ="https://api.openweathermap.org/data/2.5/weather?units=metric";
let barrio;
let ciudad_cl;
let temp;
let humedad;
let viento;
let recorridos = [];



// Captura de datos del dom y ejecucion de funciones principales

let form = document.getElementById("vecino");

  form.addEventListener("submit", (e) => {
      localStorage.clear();
      e.preventDefault();
      nombre = document.getElementById("nombre").value;
      apellido = document.getElementById("apellido").value;
      orden = document.getElementById("orden").value;
      dia = document.getElementById("dia").value;
      lista = document.getElementById("list");
      cargar_recorrido();
      mostrar_recorridos();
      clima(barrio);
      
                
    });

    
 

function cargar_recorrido(){
      
    recorridos.push(new recorrido(nombre, apellido, orden, dia));    
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("orden").value = "";
    
            
}

 function eliminar_recorrido(index) {
           showSalert(); 
       
  }

  function ordena(){
    
    recorridos.sort(((a, b) => a.orden - b.orden));
  }
  
function mostrar_recorridos() {
    !recorridos.length
      ? (lista.innerHTML = "<li>No hay recorridos</li>")
      : (lista.innerHTML = "");
    ordena();  
    recorridos.forEach((recorridos, index) => {
     
        const tiempo = recorridos.calcular_tiempo();
        barrio = recorridos.calcular_barrio(); 
        

      lista.innerHTML += `
        <li>
          <span>${recorridos.nombre + ", " + recorridos.apellido + " tiene recolección el día " + recorridos.dia + " a las "+ tiempo + " en el barrio " + barrio}</span>
          <button class="delete" onclick="eliminar_recorrido(${index})">Eliminar</button>
        </li>
      `;
    });

    localStorage.setItem("recorrido", JSON.stringify(recorridos));
  }
  
document.addEventListener("DOMContentLoaded", leer_storage);
 

function leer_storage() {

    recorridos.length = 0;
    lista = document.getElementById("list");

    const almacenados = JSON.parse(localStorage.getItem("recorrido"));
 
    for (const objeto of almacenados)
 
    recorridos.push(new recorrido(objeto.nombre, objeto.apellido, objeto.orden, objeto.dia));

    mostrar_recorridos();
  
 
}

function showSalert() {
  swal({
    title: "Desea eliminar el recorrido?",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((borrando) => {
    borrando 
    ? (recorridos.splice(index, 1), 
    swal("El recorrido fue eliminado con exito", 
    {icon: "success", }),   
    mostrar_recorridos())
    : (swal("El recorrido no fue eliminado"))
  });
}



async function clima(ciudad){
     const response = await fetch (apiurl+ `&q=`+ ciudad + `&appid=${apikey}`);
     let data = await response.json();
    console.log(data);
    ciudad_cl = data.name;
    temp = Math.round(data.main.temp) +" °C";
    humedad = data.main.humidity + " %";
    viento = data.wind.speed + "km/h";

    showclima();

 }

 

 function showclima() {
  Toastify({
    text: "El clima en tu barrio : " + ciudad_cl + "- Temp: " + temp + "- Humedad: " + humedad + "- Viento: " + viento,
    duration: 3000,
    newWindow: true,
    close: true,
    gravity: "top", 
    position: "right", 
    stopOnFocus: true, 
    style: {
      background: "linear-gradient(to right, #1c1f1f, #777975)",
    },
    
  }).showToast();
}

    
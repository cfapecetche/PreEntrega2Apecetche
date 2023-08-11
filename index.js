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
Cuando cargo la pagina leo el contenido del localStorage, convierdo el objeto a un array de objetos, lo recorro luego lo leo desde el local storage, paso nuevamente a un array de objetos, lo recorro,
ejecuto los metodos y nuevamente modifico el dom con los resultados.*/


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
                this.barrio = "ADROGUE";
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
let nombre;
let apellido;
let orden;
let dia;
let lista;
   
let recorridos = [];

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
      
     
     
      
    });

function cargar_recorrido(){

    recorridos.push(new recorrido(nombre, apellido, orden, dia));    
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("orden").value = "";
    mostrar_recorridos();         
}

 function eliminar_recorrido(index) {
    recorridos.splice(index, 1);
    mostrar_recorridos();
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
        const barrio = recorridos.calcular_barrio(); 

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


 
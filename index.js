//Entrega 1°El proyecto es sobre una app web para administrar el recorrido de recoleccion de reciclables.
// se define una clase con atributos de cada vecino y un orden y dia asignado.
// En base al orden y dia se calcula que horario (metodo calcular_tiempo) y barrio (metodo calcular_barrio) y se muestra en un mensaje.
// Por medio de una funcion se cargan los prompt y un ciclo repetitivo para continuar la carga hasta que cambie la condicion.

/* Entrega 2° - se mejora la validacion de las entradas
se agrega array de objetos, donde se almacenan los datos ingresados, luego se ordenan y se ejecutan los metodos
por ultimo se realiza una busqueda de los vecinos que figuran en determinado dia */




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
const recorridos = [];

function cargar_recorrido(){
       
    let continuar = prompt("Ingrese SI, si desea cargar datos o NO para salir");

    continuar = continuar.toUpperCase();
    
    while(continuar !== "NO"){  
          let nombre = prompt("Ingrese su nombre");
          let apellido = prompt("Ingrese su apellido");
          let dia = prompt("Ingrese el dia de la semana de su recorrido");
          let orden = prompt("Ingrese su numero de orden");
          recorridos.push(new recorrido(nombre, apellido, orden, dia));          
          continuar = prompt("Ingrese SI, si desea cargar datos o NO para salir");
          continuar = continuar.toUpperCase();
          

    }
 }


function ordena(){
    
    recorridos.sort(((a, b) => a.orden - b.orden));
  }

function genera_resultados(){

    ordena();

    for (const rec of recorridos)
          {
         const tiempo = rec.calcular_tiempo();
         const barrio = rec.calcular_barrio();
    
    alert( "Hola " + rec.nombre + ", " + rec.apellido + " tiene recoleccion el dia " + rec.dia + " a las "+ tiempo + " en el barrio " + barrio );
         }
}



function busquedaXdia()
       {
                 
        let dia = prompt("Ingrese el dia a buscar");
        dia = dia.toUpperCase();
        
        const resultado = recorridos.filter((el) => el.dia.includes(dia));

        for (const res of resultado){
           
            alert ("Resultado de busqueda por día: " + dia + " - " + res.nombre + ", " + res.apellido + " tiene recoleccion el dia " + res.dia )

        }
     }



cargar_recorrido();

genera_resultados();

busquedaXdia();

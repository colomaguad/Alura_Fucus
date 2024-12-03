const html = document.querySelector('html'); //esta variable se crea para poder cambiar de fondo y se urtiliza la etiqueta html
const botonCorto = document.querySelector('.app__card-button--corto');// estas constantes se crean para agarrar cada boton y asi poder hacer los cambios de seados en este caso es dar clic para cambiar de fondo
const botonLargo = document.querySelector('.app__card-button--largo');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sonidos/luna-rise-part-one.mp3');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span')
const audioPlay = new Audio('./sonidos/play.wav');
const audioPausa = new Audio('./sonidos/pause.mp3');
const audioTiempoFinalizado = new Audio('./sonidos/beep.mp3');
const playPause = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer')

let tiempoTranscurridoEnsegundos = 1500;
let idIntervalo = null;

musica.loop = true; // la musica siigue sonando hasta que queramos

musica.volume = 0.3; // inicia con un volumen gradual que se puede aumentar de 0 a 1
musica.currentTime = 20;// inicia a los 20 segundos



inputEnfoqueMusica.addEventListener('change', function(){

    if (musica.paused) {
        musica.play()
        
    }else{

        musica.pause()
    }
})

//se crean las funciones de los botones
// esta funciones son para cambiar el color del fondo al dar click en cada boton

/*cómo se utiliza addEventListener para escuchar el evento de clic en un botón: 

1. Seleccionar el botón:

Primero, necesitas seleccionar el botón al que quieres agregar el evento de clic. Puedes hacerlo usando document.querySelector o document.getElementById para obtener una referencia al botón.

2. Agregar el evento:

Una vez que tienes la referencia al botón, puedes usar addEventListener para agregar el evento de clic. La sintaxis es la siguiente: */


botonCorto.addEventListener('click', () =>{ //Para escuchar el evento de clic en los botones, se utiliza el método addEventListener. Este método se aplica a un elemento HTML y le permite "escuchar" un evento específico, como un clic.
   /* html.setAttribute('data-contexto','descanso-corto')     //data-contexto es una variable que se encuentra en css con los colores respectivos, es el llamado que se hace para el cambio de color
    banner.setAttribute('src', './imagenes/descanso-corto.png')?*/
    tiempoTranscurridoEnsegundos = 300
    cambiarContexto('descanso-corto')
    botonCorto.classList.add('active')/*classList lo que ase es que cuando se da click limpia el boton y se resalta con active con add */
    

}) 

//¿Qué más puedes hacer con setAttribute?

/*Puedes agregar nuevos atributos a un elemento.
Puedes eliminar un atributo existente.
Puedes cambiar el valor de un atributo existente.*/

botonLargo.addEventListener('click',() =>{
    /*html.setAttribute('data-contexto','descanso-largo')
    banner.setAttribute('src','./imagenes/descanso-largo.png')*/
    tiempoTranscurridoEnsegundos = 900
    cambiarContexto('descanso-largo')
    botonLargo.classList.add('active')
})

botonEnfoque.addEventListener('click',()=>{
    /*html.setAttribute('data-contexto','enfoque')
    banner.setAttribute('src','./imagenes/enfoque.png')*/
    tiempoTranscurridoEnsegundos = 1500
    cambiarContexto('enfoque')
    botonEnfoque.classList.add('active')
})

function cambiarContexto(contexto) {
    mostrarTiempo()
    botones.forEach(function(contexto) { /* se crea una funcion para que al pisar el boton aparezca resaltado con el metodo forEache
         permite ejecutar una función específica para cada uno de los elementos del arreglo, en el orden en que aparecen */
        contexto.classList.remove('active')
        
        
    })
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`./imagenes/${contexto}.png`)
    /*se crea esta funcion no repetir codigo y ordenando asi el mismo
    se crea una variable const banner donde se aloja las imagenes , despus se crea la funcion
    cambiarContexto con el parametro contexto en html setAtribute se deja la variable de css data-contexto y se enlasa con el parametro,
    con con la bariable se enlaza con el src imagenes y un tempaystring, es solo poner el nombre de la funcion y cambiar el nombre de la imagen */

   switch (contexto) {
    case "descanso-corto":
        titulo.innerHTML = `
          ¿Que tal tomar un respiro?
          <strong class="app__title-strong">¡haz una pausa corta!</strong>
          `
           break;

    case "descanso-largo" :
        titulo.innerHTML= `
            Hora de volver a la superficie
            <strong class="app__title-strong">¡haz una pausa larga!</strong>
            `   
            break;

    case "enfoque":
        titulo.innerHTML = `
          Optimiza tu productividad
          <strong class="app__title-strong">sumérgete en lo que importa.</strong>
          `
          break;    
    default:
        break;  /*el switch se utilizo para cambiar el texto al dar click , utilizando la funcion contexto y trayendo con
        innerHTML en codigo de cada titulo */
   }             
}

const cuentaRegresiva = () => {
    if(tiempoTranscurridoEnsegundos <=0){
        
        audioTiempoFinalizado.play()
        alert('Tiempo final')
        reiniciar()
        return;
    }
    audioTiempoFinalizado.currentTime = 20
    audioTiempoFinalizado.volume = 0.3
    playPause.setAttribute ('src','/imagenes/pause.png')
    textoIniciarPausar.textContent = "Pausar"
    tiempoTranscurridoEnsegundos -=1
    mostrarTiempo()
   
}

botonIniciarPausar.addEventListener('click', iniciarPausar)

function iniciarPausar(){
    if (idIntervalo){
        audioPausa.play();
        reiniciar()
        return
    }
    
    audioPlay.play();
    idIntervalo = setInterval(cuentaRegresiva,1000)
}

function reiniciar(){
    clearInterval(idIntervalo)
    idIntervalo=null
    playPause.setAttribute ('src','/imagenes/play_arrow.png')
    textoIniciarPausar.textContent = "Comenzar"
}

function mostrarTiempo(){

    const tiempo = new Date(tiempoTranscurridoEnsegundos * 1000)
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX',{minute:'2-digit',second:'2-digit'})
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`
}

mostrarTiempo()






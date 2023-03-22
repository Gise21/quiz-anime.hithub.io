let INDEX_PREGUNTA = 0;

let puntaje = 0;

cargarPregunta(INDEX_PREGUNTA)

function cargarPregunta(index){
    objetoPregunta = baseDePreguntasDificil[index]
    opciones = [...objetoPregunta.distractores]
    opciones.push(objetoPregunta.respuesta);
    
    for (let i = 0; i < 4; i++){
        opciones.sort(()=>Math.random()-0.5);
    }
    document.getElementById("pregunta").innerHTML = objetoPregunta.pregunta;
    document.getElementById("imagen").src = objetoPregunta.imagen;
    document.getElementById("opcion-1").innerHTML = opciones[0];
    document.getElementById("opcion-2").innerHTML = opciones[1];
    document.getElementById("opcion-3").innerHTML = opciones[2];
    document.getElementById("opcion-4").innerHTML = opciones[3];
}

async function seleccionarOpcion(index) {
    let validezRespuesta = opciones[index] == objetoPregunta.respuesta
    if (validezRespuesta) {
        await Swal.fire({
            title:"Respuesta correcta",
            html:`<span class="subtitulo-ventana">¡La respuesta ha sido correcta!</span>`,
            icon:"success",
            background:`linear-gradient(#6811b4,#0F4F4F)`,
            customClass:{
                title:'titulo-ventana',
            }
        })
        puntaje++;
    }else {
        await Swal.fire({
            title:"Respuesta incorrecta",
            html:`<span class="subtitulo-ventana">¡Respuesta incorrecta, suerte a la próxima!</span>`,
            icon:"error",
            background:`linear-gradient(#6811b4,#0F4F4F)`,
            customClass:{
                title:'titulo-ventana',
            }
    });
    }
    INDEX_PREGUNTA++;
    if (INDEX_PREGUNTA >= baseDePreguntasDificil.length){
        INDEX_PREGUNTA = 0;
        await Swal.fire({
            title:"Juego terminado",
            html:`<span class="subtitulo-ventana">Tu puntaje es de: ${puntaje}/${baseDePreguntasDificil.length}</span>`,
            confirmButtonText: 'Seguir jugando',
            footer:'<a href="../index.html" class="link-ventana">Volver al Inicio</a>',
            background:`linear-gradient(#6811b4,#0F4F4F)`,
            customClass:{
                title:'titulo-ventana',
                footer:'link-ventana'
            }
    }).then((result) => {
        if (result.isConfirmed) {
            cargarPregunta(INDEX_PREGUNTA);
        }
    })
    puntaje = 0;
    }
    cargarPregunta(INDEX_PREGUNTA);
}

let modo=document.getElementById("modo");
let body=document.body;

modo.addEventListener("click", function(){
    let val=body.classList.toggle("dark")
    localStorage.setItem("modo",val)
})

let valor=localStorage.getItem("modo")

if (valor=="true") {
    body.classList.add("dark")
} else {
    body.classList.remove("dark")
}
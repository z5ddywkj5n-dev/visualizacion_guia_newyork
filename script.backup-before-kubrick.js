function mostrarVisa(necesitaVisa){
    
    const resultado =
    document.getElementById("resultado");
    
    const grafico =
    document.getElementById("graficoVisa");
    
    if(necesitaVisa){
    
    resultado.innerHTML = `
    <p style="margin-top:20px;">
    Necesitás completar el proceso de visa.
    </p>
    `;
    
    grafico.style.display="block";
    
    }else{
    
    resultado.innerHTML = `
    <p style="margin-top:20px;">
    No necesitás visa. Sólo deberás tramitar el ESTA.
    </p>
    `;
    
    grafico.style.display="none";
    }

    }
 

const completados = new Set();

const pasos = {

1:{
titulo:"Determinar tipo de visa",
texto:"La mayoría de los argentinos necesita visa B1/B2.",
link:"https://travel.state.gov/content/travel/en/us-visas.html"
},

2:{
titulo:"Formulario DS-160",
texto:"Completar el formulario online.",
link:"https://ceac.state.gov/genniv/"
},

3:{
titulo:"Pago MRV",
texto:"Pagar la tasa de USD 185.",
link:"https://www.ustraveldocs.com/ar/"
},

4:{
titulo:"Solicitar turno",
texto:"Reservar entrevista.",
link:"https://www.ustraveldocs.com/ar/"
},

5:{
titulo:"Preparar documentación",
texto:"Pasaporte, foto y documentación financiera.",
link:"#"
},

6:{
titulo:"Entrevista",
texto:"Asistir a la Embajada.",
link:"https://ar.usembassy.gov/es/"
}

};


function togglePaso(numero){

        const circulo =
        document.getElementById("c"+numero);
    
        if(completados.has(numero)){
    
            completados.delete(numero);
    
            circulo.classList.remove("completo");
    
        }else{
    
            completados.add(numero);
    
            circulo.classList.add("completo");
    
        }
    
        document.querySelector(".progress-text")
        .innerHTML =
        `${completados.size} de 6 pasos completados`;
    
        const statue =
        document.getElementById("statue");
    
        if(completados.size===6){
    
            statue.classList.add("activa");
    
        }else{
    
            statue.classList.remove("activa");
    
        }
    
    }
const musica =
document.getElementById("introMusic");

let inicioMusica = false;

document
document.getElementById("startIntro")
.addEventListener("click", () => {

    if(!inicioMusica){

        musica.volume = 0.4;
        musica.play();

        inicioMusica = true;

    }

    introIniciada = true;

    document.getElementById("introCircle")
    .style.opacity = "1";

    document.getElementById("startIntro")
    .style.display = "none";

});

    /* ===================== */
    /* CÍRCULO CRECE */
    /* ===================== */
    window.addEventListener("scroll",()=>{

        const scroll = window.scrollY;
    
        const circle =
        document.getElementById("introCircle");
    
        const title =
        document.getElementById("introTitle");
    
        const intro =
        document.querySelector(".intro");
    
        if(!circle || !title || !intro) return;
        if(!introIniciada) return;
    
        const scale = 1 + scroll/12;
    
        circle.style.transform =
        `translate(-50%,-50%) scale(${scale})`;
    
        if(scroll > 500){
    
            circle.style.borderRadius = "0";
    
        }else{
    
            circle.style.borderRadius = "50%";
    
        }
    
        if(scroll < 700){
    
            title.style.right = "-250vw";
    
        }
    
        else if(scroll >= 700 && scroll <= 1600){
    
            const progreso =
            (scroll - 700) / 900;
    
            const posicion =
            -250 + (progreso * 320);
    
            title.style.right =
            `${posicion}vw`;
    
        }
    
        else{
    
            const progreso =
            (scroll - 1600) / 500;
    
            const posicion =
            70 + (progreso * 300);
    
            title.style.right =
            `${posicion}vw`;
    
        }
    
        if(scroll > 2600){
    
            const fade =
            1 - ((scroll-2600)/500);
    
            circle.style.opacity =
            Math.max(0,fade);
    
        }else{
    
            circle.style.opacity = 1;
    
        }
    
        if(scroll > 3100){
    
            intro.style.opacity = 0;
    
        }else{
    
            intro.style.opacity = 1;
    
        }
        if(scroll > 3200){

            musica.pause();
        
        }
        const skyline =
document.querySelector(".skyline-layer");

if(skyline){

    skyline.style.transform =
`translateY(${-scroll * 1.2}px)`;

}
    
    });
    
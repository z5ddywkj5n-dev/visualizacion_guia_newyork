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

function elegirVisa(necesitaVisa){
    mostrarVisa(necesitaVisa);

    const destino = necesitaVisa
        ? document.getElementById("graficoVisa")
        : document.getElementById("resultado");

    if(destino){
        setTimeout(()=>{
            destino.scrollIntoView({behavior:"smooth", block:"center"});
        }, 120);
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

if("scrollRestoration" in history){
    history.scrollRestoration = "manual";
}

if(!window.location.hash){
    window.scrollTo(0, 0);
    window.addEventListener("pageshow", () => window.scrollTo(0, 0), {once:true});
}

const musica =
document.getElementById("introMusic");
const hamiltonMusic =
document.getElementById("hamiltonMusic");

let inicioMusica = false;
let introIniciada = false;
let introStartScroll = 0;

document.getElementById("startIntro")
.addEventListener("click", () => {

    if(!inicioMusica){

        musica.volume = 0.4;
        musica.play().catch(() => {});

        inicioMusica = true;

    }

    if(hamiltonMusic){
        hamiltonMusic.muted = true;
        hamiltonMusic.play()
        .then(() => {
            hamiltonMusic.pause();
            hamiltonMusic.currentTime = 0;
            hamiltonMusic.muted = false;
            hamiltonMusic.volume = .72;
        })
        .catch(() => {
            hamiltonMusic.muted = false;
        });
    }

    window.scrollTo({top:0, behavior:"auto"});

    introIniciada = true;
    introStartScroll = 0;

    const introCircle = document.getElementById("introCircle");
    introCircle.style.setProperty("opacity", "1", "important");
    introCircle.style.transform = "translate(-50%,-50%) scale(1)";
    introCircle.style.borderRadius = "50%";

    const introTitle = document.getElementById("introTitle");
    introTitle.style.right = "-250vw";
    introTitle.style.setProperty("opacity", "1", "important");
    introTitle.style.setProperty("--title-blur", "0px");

    document.body.classList.remove("hero-entered");
    actualizarIntro();

    /* old circle opacity assignment removed */

    document.getElementById("startIntro")
    .style.display = "none";

});

    /* ===================== */
    /* CÍRCULO CRECE + SCROLL CINEMATOGRÁFICO */
    /* ===================== */

function clamp(valor, min, max){
    return Math.min(Math.max(valor, min), max);
}

function actualizarIntro(){
    const absoluteScroll = window.scrollY;
    const scroll = introIniciada ? Math.max(0, absoluteScroll - introStartScroll) : absoluteScroll;
    const circle = document.getElementById("introCircle");
    const title = document.getElementById("introTitle");
    const intro = document.querySelector(".intro");
    const orbit = document.getElementById("introOrbit");
    const hero = document.querySelector(".hero");
    const skyline = document.querySelector(".skyline-layer");

    if(!circle || !title || !intro) return;

    const introHeight = intro.offsetHeight - window.innerHeight;
    const progress = clamp(scroll / introHeight, 0, 1);

    document.body.classList.toggle("hero-entered", scroll > introHeight * .93);

    if(!introIniciada){
        circle.style.setProperty("opacity", "0", "important");
        return;
    }

    document.body.classList.add("is-intro-ready");

    const circleProgress = clamp((progress - .015) / .82, 0, 1);
    const softenedProgress = circleProgress * circleProgress * (3 - 2 * circleProgress);
    const scale = 1 + softenedProgress * 58;
    circle.style.transform = `translate(-50%,-50%) scale(${scale})`;
    circle.style.borderRadius = progress > .42 ? `${Math.max(0, 50 - (progress - .42) * 130)}%` : "50%";
    circle.style.setProperty(
        "opacity",
        progress > .9 ? Math.max(0, 1 - ((progress - .9) / .09)) : 1,
        "important"
    );

    const titlePosition = progress < .08 ? -250 : progress < .7 ? -250 + ((progress - .08) / .62) * 335 : 85 + ((progress - .7) / .18) * 210;
    title.style.right = `${titlePosition}vw`;
    title.style.setProperty(
        "opacity",
        progress > .9 ? Math.max(0, 1 - ((progress - .9) / .09)) : 1,
        "important"
    );
    title.style.setProperty("--title-blur", progress > .78 ? `${(progress - .78) * 18}px` : "0px");

    document.documentElement.style.setProperty("--intro-dark", progress > .7 ? .08 + (progress - .7) * 2 : .08);
    document.documentElement.style.setProperty("--grid-shift", `${absoluteScroll * -.08}px`);
    document.documentElement.style.setProperty("--hero-scale", `${1.18 - Math.min(progress, 1) * .18}`);
    document.documentElement.style.setProperty("--hero-photo-zoom", `${1.05 + Math.max(0, scroll - introHeight) * .000045}`);
    document.documentElement.style.setProperty("--city-zoom", `${1.16 - Math.min(progress, 1) * .12}`);
    document.documentElement.style.setProperty("--city-y", `${Math.max(0, scroll - introHeight) * -.05}px`);
    document.documentElement.style.setProperty("--light-drift", `${Math.sin(scroll * .01) * 10}px`);

    if(orbit){
        orbit.style.setProperty("--orbit-rotate", `${scroll * .035}deg`);
        orbit.style.transform = `translate(-50%,-50%) scale(${.62 + progress * 1.8}) rotate(${scroll * .035}deg)`;
        orbit.style.opacity = progress > .9 ? Math.max(0, 1 - ((progress - .9) / .09)) : .9;
    }


    intro.style.opacity = progress > .94 ? Math.max(0, 1 - ((progress - .94) / .055)) : 1;

    if(progress > .985){
        musica.pause();
    }

    if(skyline){
        skyline.style.transform = `translateY(${-Math.max(scroll - introHeight, 0) * .24}px)`;
    }

    if(hero){
        hero.style.filter = scroll > introHeight * .9 ? "none" : "brightness(.78)";
    }
}

window.addEventListener("scroll", actualizarIntro, {passive:true});
window.addEventListener("resize", actualizarIntro);
actualizarIntro();

const observer = new IntersectionObserver((entradas)=>{
    entradas.forEach((entrada)=>{
        if(entrada.isIntersecting){
            entrada.target.classList.add("is-visible");
        }
    });
},{threshold:.18});

document.querySelectorAll(".travel-info, .preview, .visa-option, .visa-signpost").forEach((elemento)=>{
    elemento.classList.add("reveal-on-scroll");
    observer.observe(elemento);
});
    

function actualizarTransporte(){
    const section = document.querySelector(".transport-section");
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const pinDistance = window.innerHeight * 1.12;
    const progress = clamp((-rect.top) / pinDistance, 0, 1);
    const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    section.style.setProperty("--line-progress", `${Math.round(eased * 100)}%`);
    section.style.setProperty("--train-progress", `${Math.round(eased * 100)}%`);
    section.style.setProperty("--train-x", `${-108 + eased * 226}vw`);
    section.style.setProperty("--train-glow", `${Math.round(eased * 100)}%`);
    section.style.setProperty("--station-scale", `${.72 + eased * .28}`);
    section.style.setProperty("--station-opacity", `${.45 + eased * .55}`);
    section.style.setProperty("--train-nudge", `${Math.sin(progress * Math.PI * 3) * 3}px`);
}

window.addEventListener("scroll", actualizarTransporte, {passive:true});
window.addEventListener("resize", actualizarTransporte);
actualizarTransporte();


document.querySelectorAll(".visa-tooltip a").forEach((link)=>{
    link.addEventListener("click", (event)=>{
        event.stopPropagation();
    });
});


const polaroidObserver = new IntersectionObserver((entradas)=>{
    entradas.forEach((entrada)=>{
        if(entrada.isIntersecting){
            entrada.target.classList.add("is-visible");
        }
    });
},{
    threshold:.78,
    rootMargin:"0px 0px -22% 0px"
});

document.querySelectorAll(".polaroid-grid .polaroid").forEach((polaroid)=>{
    polaroidObserver.observe(polaroid);
});


function actualizarPolaroidsPinned(){
    const section = document.querySelector(".travel-info");
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = section.offsetHeight - window.innerHeight;
    const progress = clamp(-rect.top / maxScroll, 0, 1);

    let step = 0;
    if(progress > .16) step = 1;
    if(progress > .43) step = 2;
    if(progress > .7) step = 3;

    section.dataset.step = String(step);
}

window.addEventListener("scroll", actualizarPolaroidsPinned, {passive:true});
window.addEventListener("resize", actualizarPolaroidsPinned);
actualizarPolaroidsPinned();


function actualizarSemaforoVisa(){
    const visa = document.getElementById("visa");
    if(!visa) return;

    const rect = visa.getBoundingClientRect();
    const total = rect.height + window.innerHeight;
    const progress = clamp((window.innerHeight - rect.top) / total, 0, 1);
    const visible = rect.top < window.innerHeight && rect.bottom > 0;

    visa.classList.toggle("visa-ending", visible && progress > .72);
}

window.addEventListener("scroll", actualizarSemaforoVisa, {passive:true});
window.addEventListener("resize", actualizarSemaforoVisa);
actualizarSemaforoVisa();


// Clima: scrollytelling de temperaturas por temporada
(function inicializarClima(){
    const canvas = document.getElementById("climateChart");
    if(!canvas) return;
    const hasChart = typeof Chart !== "undefined";

    const meses = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
    const temps = [1,2,6,12,17,22,25,24,21,15,9,4];
    const recomendaciones = [
        "Más frío del año. Menos turistas y mejores precios.",
        "Posibles nevadas. Ciudad más tranquila.",
        "Comienza la primavera. Todavía fresco para caminar.",
        "Recomendado. Clima templado y agradable.",
        "Uno de los mejores meses para visitar.",
        "Buen clima, aunque empieza el calor.",
        "Mes más caluroso. Mucho turismo.",
        "Calor y humedad. Alta afluencia.",
        "Temperatura ideal para recorrer la ciudad.",
        "Otoño, colores únicos y clima perfecto.",
        "Menos turistas y temperaturas frescas.",
        "Navidad: ambiente festivo y mucha actividad."
    ];

    const subtitles = {
        general:"Deslizá para descubrir los mejores meses para viajar.",
        invierno:"Diciembre a febrero: frío intenso, posibles nevadas y mejores precios.",
        primavera:"Abril y mayo: clima templado y parques en su mejor momento.",
        verano:"Julio y agosto: los meses más calurosos y turísticos.",
        otono:"Septiembre y octubre: los más recomendados para visitar Nueva York.",
        final:"Los mejores momentos: abril, mayo, septiembre y octubre."
    };

    const seasonPoints = {
        general:[], invierno:[0,1,11], primavera:[2,3,4],
        verano:[5,6,7], otono:[8,9,10], final:[3,4,8,9]
    };

    const baseFill = "#f5f1ea";
    const baseStroke = "rgba(26,39,68,.28)";
    const colors = {invierno:"#5b8fd6", primavera:"#3ED6D0", verano:"#d94b39", otono:"#138b88", final:"#3ED6D0", general:"#3ED6D0"};
    const colorFor = season => colors[season] || colors.general;
    const points = (season, highlighted, fallback) => temps.map((_, index) => (seasonPoints[season] || []).includes(index) ? highlighted : fallback);
    const radii = season => temps.map((_, index) => (seasonPoints[season] || []).includes(index) ? 10 : 5);
    const widths = season => temps.map((_, index) => (seasonPoints[season] || []).includes(index) ? 2.6 : 1.5);

    const chart = hasChart ? new Chart(canvas, {
        type:"line",
        data:{
            labels:meses,
            datasets:[{
                data:temps,
                borderColor:"#3ED6D0",
                backgroundColor:"rgba(62,214,208,0)",
                fill:false,
                tension:.42,
                borderWidth:2.5,
                pointBackgroundColor:points("general", colorFor("general"), baseFill),
                pointBorderColor:points("general", colorFor("general"), baseStroke),
                pointBorderWidth:widths("general"),
                pointRadius:radii("general"),
                pointHoverRadius:12
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            plugins:{
                legend:{display:false},
                tooltip:{
                    enabled:true,
                    backgroundColor:"rgba(12,18,28,.97)",
                    borderColor:"rgba(62,214,208,.46)",
                    borderWidth:1.5,
                    padding:{top:16,right:18,bottom:17,left:18},
                    cornerRadius:20,
                    caretSize:8,
                    caretPadding:8,
                    titleColor:"#3ED6D0",
                    bodyColor:"rgba(245,241,234,.84)",
                    displayColors:false,
                    titleAlign:"left",
                    bodyAlign:"left",
                    titleMarginBottom:9,
                    bodySpacing:7,
                    titleFont:{size:12, weight:"900", family:"Inter, system-ui, -apple-system, sans-serif", lineHeight:1.2},
                    bodyFont:{size:13, weight:"700", family:"Inter, system-ui, -apple-system, sans-serif", lineHeight:1.42},
                    callbacks:{
                        title:items => meses[items[0].dataIndex].toUpperCase(),
                        label:item => item.parsed.y + " °C promedio",
                        afterLabel:item => recomendaciones[item.dataIndex]
                    }
                }
            },
            scales:{
                y:{
                    suggestedMin:0,
                    suggestedMax:30,
                    ticks:{callback:value => value + "°C", color:"rgba(26,39,68,.58)", font:{size:12, family:"Inter, system-ui, -apple-system, sans-serif"}},
                    grid:{color:"rgba(26,39,68,.07)"},
                    border:{color:"transparent"}
                },
                x:{
                    ticks:{color:"rgba(26,39,68,.58)", font:{size:12, family:"Inter, system-ui, -apple-system, sans-serif"}},
                    grid:{color:"rgba(26,39,68,.045)"},
                    border:{color:"transparent"}
                }
            }
        }
    }) : null;

    let current = "general";
    const steps = document.querySelectorAll(".climate-step");
    const chartPhotos = document.querySelectorAll(".climate-chart-photo");
    const subtitle = document.getElementById("climateSubtitle");
    const chartWrap = document.querySelector("#clima .climate-chart-wrap");
    const floatingCard = document.createElement("div");
    floatingCard.className = "climate-floating-card";
    floatingCard.setAttribute("aria-hidden", "true");
    if(chartWrap) chartWrap.appendChild(floatingCard);

    function renderFloatingCard(step){
        const source = step ? step.querySelector(".climate-card-float") : null;
        if(!source || !floatingCard) return;
        floatingCard.innerHTML = source.innerHTML;
    }

    function clearSeasonCards(){
        steps.forEach(step => step.classList.remove("active", "card-visible"));
        chartPhotos.forEach(photo => photo.classList.remove("active"));
        floatingCard.classList.remove("visible");
    }

    function updateSeason(season){
        if(season === current && document.querySelector(`.climate-step[data-season="${season}"].active`)) return;
        current = season;
        steps.forEach(step => step.classList.toggle("active", step.dataset.season === season));
        chartPhotos.forEach(photo => photo.classList.toggle("active", photo.dataset.season === season));
        const activeStep = document.querySelector(`.climate-step[data-season="${season}"]`);
        renderFloatingCard(activeStep);
        if(chart){
            chart.data.datasets[0].pointBackgroundColor = points(season, colorFor(season), baseFill);
            chart.data.datasets[0].pointBorderColor = points(season, colorFor(season), baseStroke);
            chart.data.datasets[0].pointBorderWidth = widths(season);
            chart.data.datasets[0].pointRadius = radii(season);
        }
        if(subtitle){
            subtitle.style.opacity = "0";
            setTimeout(() => {
                subtitle.textContent = subtitles[season];
                subtitle.style.opacity = "1";
            }, 140);
        }
        if(chart) chart.update();
    }

    let climateTicking = false;
    function updateClimateFromScroll(){
        climateTicking = false;
        if(!steps.length) return;

        const scroller = document.querySelector("#clima .climate-steps");
        if(!scroller) return;

        const rect = scroller.getBoundingClientRect();
        const total = Math.max(1, scroller.offsetHeight - window.innerHeight);
        const progress = clamp((-rect.top) / total, 0, 1);
        const count = steps.length;
        const rawTimeline = progress * count - .55;
        if(rawTimeline < 0){
            clearSeasonCards();
            floatingCard.style.setProperty("--climate-float-y", "110vh");
            return;
        }

        const index = Math.min(count - 1, Math.max(0, Math.floor(rawTimeline)));
        const local = rawTimeline - index;
        const selected = steps[index];

        let visible = local > .02 && local < .94;
        let y = 110;

        if(local < .28){
            const t = clamp((local - .06) / .22, 0, 1);
            const eased = t * t * (3 - 2 * t);
            y = 110 - 110 * eased;
        }else if(local < .62){
            y = 0;
        }else if(local < .92){
            const t = clamp((local - .62) / .30, 0, 1);
            const eased = t * t * (3 - 2 * t);
            y = -110 * eased;
        }else{
            visible = false;
            y = -110;
        }

        if(!visible){
            steps.forEach(step => step.classList.remove("card-visible"));
            floatingCard.classList.remove("visible");
            floatingCard.style.setProperty("--climate-float-y", y.toFixed(1) + "vh");
            return;
        }

        updateSeason(selected.dataset.season);
        steps.forEach((step, i) => step.classList.toggle("card-visible", i === index));
        floatingCard.style.setProperty("--climate-float-y", `${y.toFixed(1)}vh`);
        floatingCard.classList.add("visible");
    }

    function requestClimateUpdate(){
        if(!climateTicking){
            climateTicking = true;
            requestAnimationFrame(updateClimateFromScroll);
        }
    }

    window.addEventListener("scroll", requestClimateUpdate, {passive:true});
    window.addEventListener("resize", requestClimateUpdate);
    updateClimateFromScroll();
})();


// Capitulos exclusivos: Visa, Clima y Alojamiento no se scrollean entre si
(function configurarCapitulosAntesDeViajar(){
    const capitulos = ["visa", "clima", "alojamiento"];
    const selectorCapitulos = capitulos.map(id => `a[href="#${id}"]`).join(",");
    const hub = document.getElementById("antes-viajar");

    function mostrarCapitulo(id, actualizarHash = true){
        if(!capitulos.includes(id)) return;
        document.body.classList.remove("chapter-mode");
        document.body.dataset.activeChapter = id;

        if(actualizarHash){
            history.pushState(null, "", `#${id}`);
        }

        requestAnimationFrame(() => {
            const destino = document.getElementById(id);
            if(destino){
                destino.scrollIntoView({behavior:"smooth", block:"start"});
            }
            setTimeout(() => window.dispatchEvent(new Event("resize")), 260);
        });
    }

    function posicionHubConPolaroids(){
        if(!hub) return 0;
        const maxScroll = Math.max(0, hub.offsetHeight - window.innerHeight);
        const revealPoint = maxScroll * .76;
        return hub.offsetTop + revealPoint;
    }

    function volverAlHub(actualizarHash = true){
        document.body.classList.remove("chapter-mode");
        delete document.body.dataset.activeChapter;

        if(hub){
            hub.dataset.step = "3";
        }

        if(actualizarHash){
            history.pushState(null, "", "#antes-viajar");
        }

        requestAnimationFrame(() => {
            window.scrollTo({
                top:posicionHubConPolaroids(),
                behavior:"smooth"
            });
            setTimeout(actualizarPolaroidsPinned, 520);
        });
    }

    document.querySelectorAll(selectorCapitulos).forEach(link => {
        link.addEventListener("click", event => {
            const id = link.getAttribute("href").replace("#", "");
            event.preventDefault();
            mostrarCapitulo(id);
        });
    });

    document.querySelectorAll('a[href="#antes-viajar"]').forEach(link => {
        link.addEventListener("click", event => {
            if(document.body.classList.contains("chapter-mode")){
                event.preventDefault();
                volverAlHub();
            }
        });
    });

    window.addEventListener("hashchange", () => {
        const id = window.location.hash.replace("#", "");
        if(capitulos.includes(id)){
            mostrarCapitulo(id, false);
        }else if(id === "antes-viajar"){
            volverAlHub(false);
        }
    });

    const inicial = window.location.hash.replace("#", "");
    if(capitulos.includes(inicial)){
        mostrarCapitulo(inicial, false);
    }
})();




function actualizarTransicionLiberty(){
    const section = document.getElementById("liberty-transition");
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / maxScroll, 0, 1);
    const rise = clamp((progress - .22) / .44, 0, 1);
    const easedRise = rise < .5 ? 2 * rise * rise : 1 - Math.pow(-2 * rise + 2, 2) / 2;
    const arrivalSlide = clamp((progress - .74) / .24, 0, 1);
    const easedArrival = arrivalSlide < .5 ? 2 * arrivalSlide * arrivalSlide : 1 - Math.pow(-2 * arrivalSlide + 2, 2) / 2;
    const passportHint = clamp((progress - .70) / .22, 0, 1);

    section.style.setProperty("--liberty-rise", easedRise.toFixed(3), "important");
    section.style.setProperty("--liberty-copy", "1", "important");
    section.style.setProperty("--arrival-slide", easedArrival.toFixed(3), "important");
    document.documentElement.style.setProperty("--arrival-slide", easedArrival.toFixed(3));
    document.documentElement.classList.toggle("transport-ready", easedArrival > .985 || rect.bottom < window.innerHeight * .35);
    section.style.setProperty("--passport-hint", passportHint.toFixed(3), "important");
}

window.addEventListener("scroll", actualizarTransicionLiberty, {passive:true});
window.addEventListener("resize", actualizarTransicionLiberty);
actualizarTransicionLiberty();




function actualizarTransicionVisa(){
    const section = document.getElementById("visa-transition");
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / maxScroll, 0, 1);

    const travel = clamp((progress - .03) / .7, 0, 1);
    const eased = travel < .5 ? 2 * travel * travel : 1 - Math.pow(-2 * travel + 2, 2) / 2;
    const approach = clamp(travel / .28, 0, 1);
    const approachEase = approach < .5 ? 2 * approach * approach : 1 - Math.pow(-2 * approach + 2, 2) / 2;
    const reveal = clamp((travel - .28) / .54, 0, 1);
    const exit = clamp((progress - .88) / .1, 0, 1);

    const lead = -96 + approachEase * 62 + reveal * 86;
    const orbit = Math.sin(eased * Math.PI) * 4;
    section.style.setProperty("--stamp-x", `${lead + orbit}vw`);
    section.style.setProperty("--stamp-spin", `${-30 + eased * 48}deg`);
    section.style.setProperty("--stamp-opacity", `${1 - exit}`);
    section.style.setProperty("--text-reveal", `${Math.round(reveal * 100)}%`);
    section.style.setProperty("--title-shift", `${-18 + reveal * 18}px`);
    section.style.setProperty("--text-opacity", "1");
    section.style.setProperty("--sub-opacity", "0");
    section.style.setProperty("--transition-fade", `${1 - exit}`);
}

window.addEventListener("scroll", actualizarTransicionVisa, {passive:true});
window.addEventListener("resize", actualizarTransicionVisa);
actualizarTransicionVisa();


/* Comida: restaurantes NYC */
(function(){
  const foodRoot = document.getElementById('comida');
  if(!foodRoot || !window.d3) return;

  const yr = document.getElementById('foodYr');
  if(yr) yr.textContent = new Date().getFullYear();

  const RESTS = [
    {name:"Katz's Delicatessen", tipo:'Deli clasico', barrio:'Lower East Side', direccion:'205 E Houston St', precio:'$$', google:4.5, pop:97, bg:'manhattan', plato:'Pastrami on rye'},
    {name:"Joe's Pizza", tipo:'Pizzeria', barrio:'Midtown Manhattan', direccion:'1435 Broadway', precio:'$', google:4.4, pop:88, plato:'Plain slice', bg:'midtown'},
    {name:"Carmine's", tipo:'Italiana', barrio:'Midtown Manhattan', direccion:'200 W 44th St', precio:'$$$', google:4.5, pop:85, plato:'Rigatoni alla vodka', bg:'midtown'},
    {name:'Shake Shack', tipo:'Hamburguesas', barrio:'Upper West Side', direccion:'366 Columbus Ave', precio:'$$', google:4.2, pop:83, plato:'ShackBurger', bg:'manhattan'},
    {name:"Ellen's Stardust Diner", tipo:'Diner americano', barrio:'Theater District', direccion:'1650 Broadway', precio:'$$', google:4.4, pop:80, plato:'Classic American breakfast', bg:'midtown'},
    {name:'Sushi Nakazawa', tipo:'Omakase japonesa', barrio:'West Village', direccion:'23 Commerce St', precio:'$$$$', google:4.5, pop:91, plato:'Omakase 20 piezas', bg:'manhattan'},
    {name:"Lombardi's Pizza", tipo:'Pizzeria', barrio:'Little Italy', direccion:'32 Spring St', precio:'$$', google:4.2, pop:82, plato:'Margherita coal-fired', bg:'manhattan'},
    {name:'Apollo Bagels', tipo:'Bagels', barrio:'Williamsburg, Brooklyn', direccion:'133 N 7th St', precio:'$', google:4.6, pop:86, plato:'Bagel con cream cheese', bg:'brooklyn'},
    {name:"Gray's Papaya", tipo:'Hot dogs', barrio:'Upper West Side', direccion:'2090 Broadway', precio:'$', google:4.2, pop:79, plato:'Recession Special', bg:'manhattan'},
    {name:'Balthazar', tipo:'Brasserie francesa', barrio:'SoHo', direccion:'80 Spring St', precio:'$$$', google:4.4, pop:88, plato:'Steak frites', bg:'manhattan'},
    {name:"Amy Ruth's", tipo:'Soul food', barrio:'Harlem', direccion:'113 W 116th St', precio:'$$', google:4.3, pop:78, plato:'Chicken & waffles', bg:'manhattan'},
    {name:'Bubba Gump Shrimp Co.', tipo:'Americana', barrio:'Times Square', direccion:'1501 Broadway', precio:'$$', google:4.3, pop:76, plato:'Shrimp platter', bg:'midtown'},
    {name:'Benjamin Steakhouse', tipo:'Steakhouse', barrio:'Midtown Manhattan', direccion:'52 E 41st St', precio:'$$$$', google:4.5, pop:84, plato:'Prime dry-aged porterhouse', bg:'midtown'},
    {name:'Peter Luger', tipo:'Steakhouse', barrio:'Williamsburg, Brooklyn', direccion:'178 Broadway', precio:'$$$$', google:4.5, pop:95, plato:'Porterhouse dry-aged', bg:'brooklyn'},
    {name:'Nobu Downtown', tipo:'Japonesa fusion', barrio:'Financial District', direccion:'195 Broadway', precio:'$$$$', google:4.4, pop:87, plato:'Black cod miso', bg:'manhattan'},
    {name:'Lucali', tipo:'Pizzeria', barrio:'Carroll Gardens, Brooklyn', direccion:'575 Henry St', precio:'$$', google:4.6, pop:92, plato:'Pizza entera + calzone', bg:'brooklyn'},
    {name:"Sylvia's", tipo:'Soul food', barrio:'Harlem', direccion:'328 Malcolm X Blvd', precio:'$$', google:4.5, pop:81, plato:'Fried chicken & waffles', bg:'manhattan'},
    {name:"Nathan's Famous", tipo:'Hot dogs', barrio:'Coney Island, Brooklyn', direccion:'1310 Surf Ave', precio:'$', google:4.2, pop:77, plato:'Original hot dog', bg:'brooklyn'},
    {name:'Grand Central Oyster Bar', tipo:'Mariscos', barrio:'Midtown Manhattan', direccion:'89 E 42nd St', precio:'$$', google:4.3, pop:83, plato:'Oyster pan roast', bg:'midtown'},
    {name:'The Halal Guys', tipo:'Street food', barrio:'Midtown Manhattan', direccion:'W 53rd St & 6th Ave', precio:'$', google:4.3, pop:85, plato:'Chicken & rice platter', bg:'midtown'},
    {name:'Russ & Daughters', tipo:'Deli judio', barrio:'Lower East Side', direccion:'179 E Houston St', precio:'$$', google:4.5, pop:89, plato:'Bagel con smoked salmon', bg:'manhattan'},
    {name:'Carbone', tipo:'Italiana', barrio:'Greenwich Village', direccion:'181 Thompson St', precio:'$$$$', google:4.4, pop:93, plato:'Veal parmesan', bg:'manhattan'},
    {name:"Xi'an Famous Foods", tipo:'China Shaanxi', barrio:'Multiple locations', direccion:'Multiple locations', precio:'$', google:4.4, pop:82, plato:'Spicy cumin lamb noodles', bg:'queens'},
    {name:'Momofuku Noodle Bar', tipo:'Asiatica fusion', barrio:'East Village', direccion:'171 First Ave', precio:'$$', google:4.3, pop:84, plato:'Pork bun + ramen', bg:'manhattan'},
    {name:'Keens Steakhouse', tipo:'Steakhouse', barrio:'Garment District', direccion:'72 W 36th St', precio:'$$$$', google:4.6, pop:90, plato:'Mutton chop', bg:'midtown'}
  ];

  const bgColors = {manhattan:'#3ED6D0', brooklyn:'#138b88', midtown:'#1A2744', queens:'#5DCAA5'};
  const tipoColors = {'Omakase japonesa':'#3ED6D0','Mariscos':'#3ED6D0','Brasserie francesa':'#3ED6D0','Asiatica fusion':'#3ED6D0','Japonesa fusion':'#3ED6D0','Deli clasico':'#138b88','Deli judio':'#138b88','Street food':'#138b88','Diner americano':'#138b88','China Shaanxi':'#138b88','Bagels':'#138b88','Pizzeria':'#1A2744','Steakhouse':'#1A2744','Italiana':'#1A2744','Soul food':'#1A2744','Americana':'#5DCAA5','Hot dogs':'#5DCAA5','Hamburguesas':'#5DCAA5'};
  const precioColors = {'$':'#5DCAA5','$$':'#3ED6D0','$$$':'#138b88','$$$$':'#1A2744'};
  const legends = {barrio:[{color:'#3ED6D0',label:'Manhattan'},{color:'#138b88',label:'Brooklyn'},{color:'#1A2744',label:'Midtown'},{color:'#5DCAA5',label:'Queens'}],tipo:[{color:'#3ED6D0',label:'Japonesa · Mariscos · Brasserie · Asiatica'},{color:'#138b88',label:'Deli · Street food · Diner · China'},{color:'#1A2744',label:'Pizzeria · Steakhouse · Italiana · Soul food'},{color:'#5DCAA5',label:'Americana · Hot dogs · Hamburguesas'}],precio:[{color:'#5DCAA5',label:'$ — hasta $20'},{color:'#3ED6D0',label:'$$ — $20-50'},{color:'#138b88',label:'$$$ — $50-100'},{color:'#1A2744',label:'$$$$ — $100+'}]};

  let colorMode = 'barrio';
  let activeFilter = 'all';
  let searchStr = '';
  let W = 0;
  let H = 0;
  let sim;
  let allNodes = [];

  function getColor(d){ if(colorMode === 'barrio') return bgColors[d.bg] || '#3eb89a'; if(colorMode === 'tipo') return tipoColors[d.tipo] || '#3eb89a'; return precioColors[d.precio] || '#3eb89a'; }
  function isVisible(d){ const passFilter = activeFilter === 'all' || d.bg === activeFilter; const haystack = `${d.name} ${d.tipo} ${d.barrio}`.toLowerCase(); return passFilter && (!searchStr || haystack.includes(searchStr)); }
  function renderLegend(){ const el = document.getElementById('foodLegRow'); if(!el) return; el.innerHTML = legends[colorMode].map(l => `<div class="food-leg-item"><div class="food-leg-dot" style="background:${l.color}"></div><span>${l.label}</span></div>`).join(''); }
  function updateVisibility(){ const svg = d3.select('#foodBsvg'); svg.selectAll('g.food-bnode').transition().duration(320).attr('opacity', d => isVisible(d) ? 1 : .1).style('pointer-events', d => isVisible(d) ? 'auto' : 'none'); const cb = document.getElementById('food-cb-all'); if(cb) cb.textContent = RESTS.filter(isVisible).length; }
  function showTT(ev,d){ document.getElementById('food-tt-name').textContent = d.name; document.getElementById('food-tt-tipo').textContent = d.tipo; document.getElementById('food-tt-barrio').textContent = d.barrio; const px = {'$':'hasta $20','$$':'$20 - $50','$$$':'$50 - $100','$$$$':'$100+'}; document.getElementById('food-tt-precio').textContent = px[d.precio] || d.precio; document.getElementById('food-tt-google').textContent = `${d.google} / 5`; const pb = document.getElementById('food-tt-popbar'); pb.style.width = `${d.pop}%`; pb.style.background = `linear-gradient(90deg,${getColor(d)},rgba(245,241,234,.06))`; const pw = document.getElementById('food-tt-plato-wrap'); if(d.plato){ document.getElementById('food-tt-plato').textContent = d.plato; pw.style.display = 'block'; }else{ pw.style.display = 'none'; } document.getElementById('foodTooltip').style.opacity = '1'; moveTT(ev); }
  function moveTT(ev){ const tt = document.getElementById('foodTooltip'); let x = ev.clientX + 18; let y = ev.clientY - 24; if(x + 254 > window.innerWidth) x = ev.clientX - 258; if(y + 260 > window.innerHeight) y = ev.clientY - 250; tt.style.left = `${x}px`; tt.style.top = `${y}px`; }
  function hideTT(){ const tt = document.getElementById('foodTooltip'); if(tt) tt.style.opacity = '0'; }

  function buildChart(){
    const container = document.querySelector('.food-chart-wrap');
    if(!container) return;
    W = container.clientWidth;
    H = Math.min(W * 1.08, 980);
    H = Math.max(H, 680);
    const rMax = d3.max(RESTS, d => d.pop);
    const rMin = d3.min(RESTS, d => d.pop);
    const rScale = d3.scaleSqrt().domain([rMin * .85, rMax]).range([W * .015, W * .078]);
    const svg = d3.select('#foodBsvg').attr('viewBox', `0 0 ${W} ${H}`).attr('height', H);
    svg.selectAll('*').remove();
    const defs = svg.append('defs');
    RESTS.forEach((d,i) => { const g = defs.append('radialGradient').attr('id', `foodGrad${i}`).attr('cx','38%').attr('cy','38%').attr('r','62%'); const c = getColor(d); g.append('stop').attr('offset','0%').attr('stop-color', c).attr('stop-opacity', 1); g.append('stop').attr('offset','100%').attr('stop-color', c).attr('stop-opacity', .7); });
    allNodes = RESTS.map((d,i) => ({...d, idx:i, r:rScale(d.pop), x:W/2 + (Math.random() - .5) * W * .5, y:H/2 + (Math.random() - .5) * H * .5}));
    if(sim) sim.stop();
    const gNodes = svg.selectAll('g.food-bnode').data(allNodes).enter().append('g').attr('class','food-bnode').style('cursor','pointer').on('mouseenter', function(ev,d){ if(!isVisible(d)) return; d3.select(this).select('circle.food-outer').transition().duration(200).attr('r', d.r * 1.12).attr('stroke-width', 1.5).attr('stroke-opacity', .9); d3.select(this).select('circle.food-inner').transition().duration(200).attr('r', d.r * 1.12).attr('fill-opacity', .95); showTT(ev,d); }).on('mousemove', moveTT).on('mouseleave', function(ev,d){ d3.select(this).select('circle.food-outer').transition().duration(200).attr('r', d.r).attr('stroke-width', 1.5).attr('stroke-opacity', isVisible(d) ? 1 : .15); d3.select(this).select('circle.food-inner').transition().duration(200).attr('r', d.r).attr('fill-opacity', isVisible(d) ? 1 : .15); hideTT(); });
    gNodes.append('circle').attr('class','food-outer').attr('r', d => d.r).attr('fill','none').attr('stroke', d => getColor(d)).attr('stroke-width',1.5).attr('stroke-opacity',.9);
    gNodes.append('circle').attr('class','food-inner').attr('r', d => d.r).attr('fill', (d,i) => `url(#foodGrad${i})`).attr('fill-opacity',1);
    gNodes.each(function(d){ if(d.r < 18) return; const words = d.name.split(' '); const fontSize = Math.max(6.5, d.r * .19); const lineH = fontSize * 1.22; const maxCharsPerLine = Math.floor(d.r * 1.7 / (fontSize * .55)); const lines = []; let current = ''; words.forEach(w => { const test = current ? `${current} ${w}` : w; if(test.length <= maxCharsPerLine){ current = test; }else{ if(current) lines.push(current); current = w; } }); if(current) lines.push(current); const fitLines = lines.slice(0, Math.max(1, Math.floor((d.r * 1.6) / lineH))); const totalH = fitLines.length * lineH; const txt = d3.select(this).append('text').attr('text-anchor','middle').style('font-size', `${fontSize}px`).style('font-family','Inter, system-ui, sans-serif').style('font-weight','700').style('fill','rgba(255,255,255,.95)').style('pointer-events','none').style('user-select','none').style('letter-spacing','-.01em'); fitLines.forEach((line,i) => txt.append('tspan').attr('x',0).attr('dy', i === 0 ? `${-(totalH / 2 - lineH * .75)}px` : `${lineH}px`).text(line)); });
    sim = d3.forceSimulation(allNodes).force('center', d3.forceCenter(W/2,H/2).strength(.04)).force('collision', d3.forceCollide(d => d.r + 3).strength(1).iterations(4)).force('x', d3.forceX(W/2).strength(.018)).force('y', d3.forceY(H/2).strength(.022)).alphaDecay(.015).on('tick', () => { gNodes.attr('transform', d => { d.x = Math.max(d.r + 4, Math.min(W - d.r - 4, d.x)); d.y = Math.max(d.r + 4, Math.min(H - d.r - 4, d.y)); return `translate(${d.x},${d.y})`; }); });
    updateVisibility();
    window.foodRefreshColors = function(){ defs.selectAll('radialGradient').remove(); allNodes.forEach((d,i) => { const c = getColor(d); const g = defs.append('radialGradient').attr('id', `foodGrad${i}`).attr('cx','38%').attr('cy','38%').attr('r','62%'); g.append('stop').attr('offset','0%').attr('stop-color', c).attr('stop-opacity', 1); g.append('stop').attr('offset','100%').attr('stop-color', c).attr('stop-opacity', .7); }); svg.selectAll('g.food-bnode circle.food-outer').transition().duration(450).attr('stroke', d => getColor(d)); svg.selectAll('g.food-bnode circle.food-inner').attr('fill', (d,i) => `url(#foodGrad${i})`); };
  }

  function applyFoodScrollState(nextColor, nextFilter){
    const wantedColor = nextColor || colorMode;
    const wantedFilter = nextFilter || activeFilter;
    const colorChanged = wantedColor !== colorMode;
    const filterChanged = wantedFilter !== activeFilter;
    if(!colorChanged && !filterChanged) return;

    colorMode = wantedColor;
    activeFilter = wantedFilter;

    document.querySelectorAll('[data-food-color]').forEach(b => b.classList.toggle('active', b.dataset.foodColor === colorMode));
    document.querySelectorAll('[data-food-filter]').forEach(b => b.classList.toggle('active', b.dataset.foodFilter === activeFilter));
    renderLegend();
    if(colorChanged && window.foodRefreshColors) window.foodRefreshColors();
    updateVisibility();
  }

  document.querySelectorAll('[data-food-color]').forEach(btn => { btn.addEventListener('click', () => { applyFoodScrollState(btn.dataset.foodColor, activeFilter); }); });
  document.querySelectorAll('[data-food-filter]').forEach(btn => { btn.addEventListener('click', () => { applyFoodScrollState(colorMode, btn.dataset.foodFilter); }); });

  const scrollSteps = Array.from(document.querySelectorAll('.food-scroll-step'));
  let activeScrollStep = -1;
  function updateFoodScrollFilters(){
    if(!scrollSteps.length) return;
    const targetY = window.innerHeight * .52;
    let bestIndex = 0;
    let bestDistance = Infinity;
    scrollSteps.forEach((step, index) => {
      const rect = step.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const distance = Math.abs(center - targetY);
      if(distance < bestDistance){
        bestDistance = distance;
        bestIndex = index;
      }
    });
    if(bestIndex === activeScrollStep) return;
    activeScrollStep = bestIndex;
    scrollSteps.forEach((step, index) => step.classList.toggle('active', index === bestIndex));
    const step = scrollSteps[bestIndex];
    applyFoodScrollState(step.dataset.foodScrollColor, step.dataset.foodScrollFilter);
  }
  window.addEventListener('scroll', updateFoodScrollFilters, {passive:true});
  window.addEventListener('resize', updateFoodScrollFilters);
  const search = document.getElementById('foodSearchBox');
  if(search){ search.addEventListener('input', () => { searchStr = search.value.toLowerCase().trim(); updateVisibility(); }); }
  renderLegend();
  buildChart();
  updateFoodScrollFilters();
  window.addEventListener('resize', () => { clearTimeout(window.foodResizeTimer); window.foodResizeTimer = setTimeout(buildChart, 220); });
})();

(function(){
  const sec = document.getElementById('foodIntro');
  if(!sec) return;
  const breakfast = sec.querySelector('.breakfast');
  const lunch = sec.querySelector('.lunch');
  const dinner = sec.querySelector('.dinner');
  const eat = sec.querySelector('.eat');
  const title = sec.querySelector('.food-k-title');
  let ticking = false;
  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
  const seg = (p,a,b) => clamp((p-a)/(b-a), 0, 1);
  const ease = t => t*t*(3-2*t);
  function word(el,opacity,x,y,scale,spacing,blur){ if(!el) return; el.style.opacity = opacity; el.style.transform = `translate(${x}vw,${y}vh) scale(${scale})`; el.style.letterSpacing = `${spacing}em`; el.style.filter = `blur(${blur}px)`; }
  function update(){ ticking = false; const rect = sec.getBoundingClientRect(); const total = Math.max(1, sec.offsetHeight - window.innerHeight); const p = clamp(-rect.top / total, 0, 1); const bIn = Math.max(.08, ease(seg(p,.00,.12))); const bSplit = ease(seg(p,.16,.31)); const bOut = ease(seg(p,.30,.42)); const lIn = ease(seg(p,.25,.38)); const lSplit = ease(seg(p,.39,.52)); const lOut = ease(seg(p,.51,.63)); const dIn = ease(seg(p,.48,.60)); const dSplit = ease(seg(p,.62,.74)); const dOut = ease(seg(p,.74,.83)); const eIn = ease(seg(p,.70,.79)); const eOut = ease(seg(p,.82,.90)); const tIn = ease(seg(p,.82,.96)); word(breakfast, Math.max(.001, bIn * (1 - bOut)), -42 * bSplit, -10 * bOut, 1 + .10*bIn + .20*bSplit, -.08 + .30*bSplit, 3*bOut); word(lunch, lIn * (1 - lOut), 34 * lSplit, 0, 1 + .12*lIn + .16*lSplit, -.08 + .28*lSplit, 3*lOut); word(dinner, dIn * (1 - dOut), -24 * dSplit, 8 * dOut, 1 + .10*dIn + .18*dSplit, -.08 + .25*dSplit, 3*dOut); word(eat, eIn * (1 - eOut), 18 - 18*eIn, 0, .85 + .35*eIn + .35*eOut, -.08 + .24*eOut, 2*eOut); if(title){ title.style.opacity = tIn; title.style.transform = `translateY(${70 - 70*tIn}px)`; } }
  function request(){ if(!ticking){ ticking = true; requestAnimationFrame(update); } }
  window.addEventListener('scroll', request, {passive:true});
  window.addEventListener('resize', request);
  update();
})();

(function(){
  const track = document.getElementById('foodStatsTrack');
  const numEl = document.getElementById('food-stat-num');
  const descEl = document.getElementById('food-stat-desc');
  if(!track || !numEl || !descEl) return;
  const scenes = [{num:'27K+', desc:'restaurantes registrados<br>en Nueva York'},{num:'114', desc:'estrellas Michelin<br>en la ciudad'},{num:'$', desc:'opciones para todos<br>los presupuestos'}];
  let currentIdx = -1;
  const clamp = (v,a,b) => Math.max(a, Math.min(b, v));
  function setScene(idx){ if(idx === currentIdx) return; currentIdx = idx; const s = scenes[idx]; numEl.style.transition = 'opacity .18s ease, transform .18s ease'; descEl.style.transition = 'opacity .18s ease, transform .18s ease'; numEl.style.opacity = '0'; numEl.style.transform = 'translateY(-24px)'; descEl.style.opacity = '0'; descEl.style.transform = 'translateY(-16px)'; setTimeout(() => { numEl.textContent = s.num; descEl.innerHTML = s.desc; numEl.style.transition = 'opacity .38s ease, transform .38s ease'; descEl.style.transition = 'opacity .38s ease, transform .38s ease'; numEl.style.opacity = '1'; numEl.style.transform = 'translateY(0)'; descEl.style.opacity = '1'; descEl.style.transform = 'translateY(0)'; }, 190); }
  function onScroll(){ const rect = track.getBoundingClientRect(); const total = track.offsetHeight - window.innerHeight; if(total <= 0) return; const p = clamp(-rect.top / total, 0, 1); const idx = Math.min(Math.floor(p * 3), 2); setScene(idx); }
  numEl.style.opacity = '1';
  descEl.style.opacity = '1';
  currentIdx = 0;
  window.addEventListener('scroll', onScroll, {passive:true});
  window.addEventListener('resize', onScroll);
  onScroll();
})();

function ajustarAltoAirbnb(){
    const iframe = document.querySelector('.airbnb-embed-wrap iframe');
    if(!iframe) return;

    try{
        const doc = iframe.contentDocument || iframe.contentWindow.document;
        if(!doc) return;
        const body = doc.body;
        const html = doc.documentElement;
        const height = Math.max(
            body ? body.scrollHeight : 0,
            body ? body.offsetHeight : 0,
            html ? html.scrollHeight : 0,
            html ? html.offsetHeight : 0
        );
        if(height){
            const safeHeight = Math.max(height + 80, window.innerWidth < 760 ? 2260 : 1880);
            iframe.style.setProperty('height', `${safeHeight}px`, 'important');
            iframe.style.setProperty('min-height', `${safeHeight}px`, 'important');
        }
    }catch(error){
        iframe.style.setProperty('height', '1540px', 'important');
        iframe.style.setProperty('min-height', '1540px', 'important');
    }
}

const airbnbFrame = document.querySelector('.airbnb-embed-wrap iframe');
if(airbnbFrame){
    airbnbFrame.addEventListener('load', ()=>{
        ajustarAltoAirbnb();
        setTimeout(ajustarAltoAirbnb, 350);
        setTimeout(ajustarAltoAirbnb, 1200);
    });
    window.addEventListener('resize', ajustarAltoAirbnb);
    ajustarAltoAirbnb();
}


function actualizarTransicionClima(){
    const section = document.getElementById('weather-transition');
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / maxScroll, 0, 1);
    const eased = progress < .5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;

    const slide = clamp((progress - .76) / .22, 0, 1);
    const easedSlide = slide < .5 ? 2 * slide * slide : 1 - Math.pow(-2 * slide + 2, 2) / 2;

    section.style.setProperty('--weather-p', eased.toFixed(3));
    section.style.setProperty('--weather-slide', easedSlide.toFixed(3));
    document.documentElement.style.setProperty('--weather-slide', easedSlide.toFixed(3));
    section.classList.toggle('weather-s1', progress >= .06 && progress < .28);
    section.classList.toggle('weather-s2', progress >= .28 && progress < .50);
    section.classList.toggle('weather-s3', progress >= .50 && progress < .72);
    section.classList.toggle('weather-s4', progress >= .72 && progress < .93);
}

window.addEventListener('scroll', actualizarTransicionClima, {passive:true});
window.addEventListener('resize', actualizarTransicionClima);
actualizarTransicionClima();


function actualizarTransicionAlojamiento(){
    const section = document.getElementById('stay-transition');
    if(!section) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = clamp(-rect.top / maxScroll, 0, 1);
    const ease = t => t < .5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
    const range = (a,b) => clamp((progress - a) / (b - a), 0, 1);

    const suitcase = ease(range(.10, .34));
    const pack = ease(range(.30, .66));
    const open = 0;
    const clothesOut = 0;
    const slide = ease(range(.80, .98));

    section.style.setProperty('--stay-p', suitcase.toFixed(3));
    section.style.setProperty('--stay-open', open.toFixed(3));
    section.style.setProperty('--stay-burst', clothesOut.toFixed(3));
    section.style.setProperty('--stay-slide', slide.toFixed(3));
    document.documentElement.style.setProperty('--stay-slide', slide.toFixed(3));
}

window.addEventListener('scroll', actualizarTransicionAlojamiento, {passive:true});
window.addEventListener('resize', actualizarTransicionAlojamiento);
actualizarTransicionAlojamiento();


(function sincronizarBroadwayConPagina(){
    const section = document.querySelector('.broadway-embed-section');
    const frame = section && section.querySelector('iframe');
    if(!section || !frame) return;

    let innerRange = 0;
    let scheduled = false;
    const TRACK_SPEED = .44;

    function medir(){
        try{
            const doc = frame.contentDocument;
            const win = frame.contentWindow;
            if(!doc || !win) return;

            const body = doc.body;
            const html = doc.documentElement;
            const contentHeight = Math.max(
                body ? body.scrollHeight : 0,
                body ? body.offsetHeight : 0,
                html ? html.scrollHeight : 0,
                html ? html.offsetHeight : 0
            );
            innerRange = Math.max(0, contentHeight - frame.clientHeight);
            const trackHeight = Math.max(
                window.innerHeight * 2,
                innerRange * TRACK_SPEED + window.innerHeight
            );
            section.style.setProperty('--broadway-track-height', `${trackHeight}px`);

            html.style.scrollbarWidth = 'none';
            html.style.setProperty('scroll-behavior', 'auto', 'important');
            if(body) body.style.scrollbarWidth = 'none';
        }catch(error){
            innerRange = window.innerHeight * 8;
        }
    }

    function actualizar(){
        scheduled = false;
        if(!innerRange) medir();
        const rect = section.getBoundingClientRect();
        const outerRange = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / outerRange));
        try{
            frame.contentWindow.scrollTo(0, progress * innerRange);
        }catch(error){}
    }

    function solicitarActualizacion(){
        if(scheduled) return;
        scheduled = true;
        requestAnimationFrame(actualizar);
    }

    function prepararFrame(){
        try{
            const doc = frame.contentDocument;
            if(!doc) return;
            document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
            const scrollbarStyle = doc.createElement('style');
            scrollbarStyle.textContent = 'html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important}';
            doc.head.appendChild(scrollbarStyle);

            doc.addEventListener('wheel', event => {
                event.preventDefault();
                window.scrollBy(0, event.deltaY * 1.65);
            }, {passive:false});
        }catch(error){}

        medir();
        try{ frame.contentWindow.scrollTo(0, 0); }catch(error){}
        solicitarActualizacion();
        setTimeout(() => { medir(); solicitarActualizacion(); }, 350);
        setTimeout(() => { medir(); solicitarActualizacion(); }, 1400);
    }

    frame.addEventListener('load', prepararFrame);
    window.addEventListener('scroll', solicitarActualizacion, {passive:true});
    window.addEventListener('resize', () => {
        medir();
        solicitarActualizacion();
    });

    if(frame.contentDocument && frame.contentDocument.readyState === 'complete') prepararFrame();
})();

(function sincronizarPostersBroadway(){
    const section = document.querySelector('.broadway-posters-embed');
    const frame = section && section.querySelector('iframe');
    if(!section || !frame) return;

    let innerRange = 0;
    let scheduled = false;

    function medir(){
        try{
            const doc = frame.contentDocument;
            const html = doc && doc.documentElement;
            const body = doc && doc.body;
            if(!doc || !html) return;

            const contentHeight = Math.max(
                html.scrollHeight,
                html.offsetHeight,
                body ? body.scrollHeight : 0,
                body ? body.offsetHeight : 0
            );
            innerRange = Math.max(0, contentHeight - frame.clientHeight);
            const trackHeight = Math.max(
                window.innerHeight * 2,
                innerRange * .68 + window.innerHeight
            );
            section.style.setProperty('--poster-track-height', `${trackHeight}px`);
            html.style.setProperty('scroll-behavior', 'auto', 'important');
            html.style.scrollbarWidth = 'none';
            if(body) body.style.scrollbarWidth = 'none';
        }catch(error){}
    }

    function actualizar(){
        scheduled = false;
        const rect = section.getBoundingClientRect();
        const outerRange = Math.max(1, section.offsetHeight - window.innerHeight);
        const progress = Math.max(0, Math.min(1, -rect.top / outerRange));

        try{
            frame.contentWindow.scrollTo(0, progress * innerRange);
        }catch(error){}

        const shouldPlay = progress >= .91 && progress < .985 &&
            rect.bottom > 0 && rect.top < window.innerHeight;

        if(hamiltonMusic){
            if(shouldPlay && hamiltonMusic.paused){
                hamiltonMusic.volume = .72;
                hamiltonMusic.play().catch(() => {});
            }else if(!shouldPlay && !hamiltonMusic.paused){
                hamiltonMusic.pause();
            }
        }
    }

    function solicitar(){
        if(scheduled) return;
        scheduled = true;
        requestAnimationFrame(actualizar);
    }

    function preparar(){
        try{
            const doc = frame.contentDocument;
            if(!doc) return;
            const style = doc.createElement('style');
            style.textContent = 'html::-webkit-scrollbar,body::-webkit-scrollbar{display:none!important}html{scroll-behavior:auto!important}';
            doc.head.appendChild(style);
            doc.addEventListener('wheel', event => {
                event.preventDefault();
                window.scrollBy(0, event.deltaY * 1.45);
            }, {passive:false});
        }catch(error){}

        medir();
        solicitar();
        setTimeout(() => { medir(); solicitar(); }, 500);
    }

    frame.addEventListener('load', preparar);
    window.addEventListener('scroll', solicitar, {passive:true});
    window.addEventListener('resize', () => {
        medir();
        solicitar();
    });
    if(frame.contentDocument && frame.contentDocument.readyState === 'complete') preparar();
})();

function detenerHamiltonFueraDeSeccion(){
    if(!hamiltonMusic || hamiltonMusic.paused) return;

    const section = document.querySelector('.broadway-posters-embed');
    if(!section){
        hamiltonMusic.pause();
        return;
    }

    const rect = section.getBoundingClientRect();
    const outerRange = Math.max(1, section.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -rect.top / outerRange));
    const enTramoHamilton = progress >= .91 && progress < .985 &&
        rect.bottom > 0 && rect.top < window.innerHeight;

    if(!enTramoHamilton) hamiltonMusic.pause();
}

window.addEventListener("scroll", detenerHamiltonFueraDeSeccion, {passive:true});
window.addEventListener("pagehide", detenerHamiltonFueraDeSeccion);
document.addEventListener("visibilitychange", () => {
    if(document.hidden && hamiltonMusic) hamiltonMusic.pause();
});

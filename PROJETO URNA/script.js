let seuVotoPara = document.querySelector('.d1-1 span');
let cargo = document.querySelector('.d1-2 span');
let informacoes = document.querySelector('.d1-4');
let aviso = document.querySelector('.dv-2');
let lateral = document.querySelector('.d1--right');
let numeros = document.querySelector('.d1-3');

// VARIAVEIS DE ANBIENTE
let etapaAtual =0;
let numero = '';
let votoBranco = false;
let votos = [];


function IniciarEtapa() {
    let etapa = etapas[etapaAtual];

    let numeroHTML = '';
    numero = '';
    votoBranco = false;

    for(let i = 0; i<etapa.numeros; i++) {
        if(i === 0) {
            numeroHTML +='<div class="numero pisca"></div>';
        } else {
            numeroHTML += '<div class="numero"></div>';
        }
        
    }

    seuVotoPara.style.display ='none';
    cargo.innerHTML = etapa.titulo;
    informacoes.innerHTML ='';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHTML;
}

function attInter() {
     let etapa = etapas[etapaAtual];
     let candidato = etapa.candidatos.filter((item)=> {
        if(item.numero === numero) {
            return true;
        } else {
            return false;
        }
     });

    if(candidato.length > 0) {
        candidato = candidato[0];
        seuVotoPara.style.display ='block';
        aviso.style.display ='block';
        informacoes.innerHTML = `Nome: ${candidato.nome} <br/> Partido: ${candidato.partido}`;

        let fotoHTML = '';
        for(let i in candidato.fotos) {
            if(candidato.fotos[i].samll){
                fotoHTML += `<div class="d1--img small"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            } else {
                fotoHTML += `<div class="d1--img"><img src="images/${candidato.fotos[i].url}" alt="">${candidato.fotos[i].legenda}</div>`;
            }
           
        }
        lateral.innerHTML = fotoHTML;  
    } else {
        seuVotoPara.style.display ='block';
        aviso.style.display ='block';
        informacoes.innerHTML = ' <br/> <div class="aviso--grande pisca ">VOTO NULO</div>'
    }
    
}

function clicou(n) {
    let elNumero = document.querySelector('.numero.pisca');
    if(elNumero !== null) {
        elNumero.innerHTML = n;
        numero = `${numero}${n}`;

        elNumero.classList.remove('pisca');
        if(elNumero.nextElementSibling !== null) {
            elNumero.nextElementSibling.classList.add('pisca');
        } else {
            attInter();
        }
    }
}

function branco() {
    numero = '';
    votoBranco = true;

    seuVotoPara.style.display ='block';
    aviso.style.display = 'block';
    numeros.innerHTML = '';
    informacoes.innerHTML = ' <br/> <div class="aviso--grande pisca ">VOTO EM BRANCO</div>'
    lateral.innerHTML ='';
}

function corregi() {
    IniciarEtapa();
}

function confirma() {
    let etapa = etapas[etapaAtual]; 

    let votoConfirmado = false;
    
    if(votoBranco === true) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        });
    } else if(numero.length === etapa.numeros) {
        votoConfirmado = true;
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: numero
        });
    }

    if(votoConfirmado) {
        etapaAtual ++;
        if(etapas[etapaAtual] !== undefined) {
            IniciarEtapa();
        } else {
            document.querySelector('.tela').innerHTML ='<br/> <div class="aviso--gigante pisca ">FIM</div>';
            console.log(votos);
        }
    }
}

document.body.addEventListener('keyup', (event) => {
    let numeral = event.key

    let int = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (int.indexOf(numeral) != -1) {
        clicou(numeral)
    } else {
        
    }
});

IniciarEtapa();
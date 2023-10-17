

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias HTML

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const puntosHTML = document.querySelectorAll('small')


// Esta función crea un nuevo deck
const crearDeck = () => {

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tipos) {
            deck.push(i + tipo);
        }
    }

    // console.log(deck);


    for (let tipo of tipos) {
        for (let especial of especiales) {
            deck.push(especial + tipo);
        }
    }
    // console.log( deck );

    //ACA SE UTILIZA LIBRERIA PARA ELEGIR AL AZAR UNDERSCORE
    deck = _.shuffle(deck);
    console.log(deck);
    return deck;
}

crearDeck();

//Esta funcion me permite tomar una carta
const pedirCarta = () => {

    if (deck.length === 0) {
        throw 'No hay cartas en el deck';
    }
    const carta = deck.pop();

    return carta;
}


// pedirCarta();

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ?
        (valor === 'A') ? 11 : 10
        : valor * 1;
}

//Truno de la compu

const turnoComputadora = (puntosMinimos) => {
    do {
        //FUNCION PARA SUMAR PUNTOS DE LA CARTA 
        const carta = pedirCarta();

        puntosComputadora = puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;

        // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
        //FUNCION PARA INSERTAR IMG DE LA CARTA

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21) {
            break;
        }

    } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));

    setTimeout(() => {        
        if (puntosComputadora === puntosMinimos) {
            alert('Nadie ganó')
        } else if (puntosJugador > 21) {
            alert('Ganó la computadora')
        }
        else if (puntosComputadora > 21 ){ 
            alert('Ganó el Jugador')
        } else { alert('Computadora ganó')} 
        
    }, 100 );


}


//Eventos

btnPedir.addEventListener('click', () => {

    //FUNCION PARA SUMAR PUNTOS DE LA CARTA 
    const carta = pedirCarta();

    puntosJugador = puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador;

    // <!-- <img class="carta" src="assets/cartas/2C.png"> -->
    //FUNCION PARA INSERTAR IMG DE LA CARTA

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta);

    if (puntosJugador > 21) {
        console.warn('Perdiste');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    } else if (puntosJugador === 21) {
        console.warn('21, genial');
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador);
    }
});


btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora(puntosJugador);
});


btnNuevo.addEventListener('click', () => {
    
    console.clear();

    deck = [];
    deck = crearDeck();

    puntosJugador       = 0;
    puntosComputadora   = 0;
    
    puntosHTML[0].innerHTML = 0; 
    puntosHTML[1].innerHTML = 0; 

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = '';

    btnPedir.disabled = false;
    btnDetener.disabled = false;
});
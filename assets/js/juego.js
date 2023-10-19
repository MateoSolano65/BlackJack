
//Se crea una función anónima

const miModulo = (() => {

    'use strict' //sirve para que JS privatice algunas cosas



    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];

    let puntosJugadores = [];

    //Referencias HTML

    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevo = document.querySelector('#btnNuevo');

    const divCartasJugadores = document.querySelectorAll('.divCartas'),
        puntosHTML = document.querySelectorAll('small');




    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
        
        puntosJugadores = [];
        
        for (let i = 0; i < numJugadores; i++) {
            puntosJugadores.push(0);
        }

        puntosHTML.forEach( element => element.innerText = 0);
        divCartasJugadores.forEach( element => element.innerText = '' );

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    }


    // Esta función crea un nuevo deck
    const crearDeck = () => {

        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo);
            }
        }

        //ACA SE UTILIZA LIBRERIA PARA ELEGIR AL AZAR UNDERSCORE
        return _.shuffle(deck);
    }

    //Esta funcion me permite tomar una carta
    const pedirCarta = () => {

        if (deck.length === 0) {
            throw 'No hay cartas en el deck';
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;
    }

    //Turno 0 es el primero y el último será la PC
    const acumularPuntos = (carta, turno) => {

        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHTML[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }


    //FUNCION PARA INSERTAR IMG DE LA CARTA

    const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append(imgCarta);

    }

    //DETERMINA QUIEN GANA  
    const determinarGanador = () => {
    
        const [ puntosMinimos, puntosComputadora ] = puntosJugadores;

        setTimeout(() => {               //Sirve para que salga el alert al final
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie ganó')
            } else if (puntosMinimos > 21) {
                alert('Ganó la computadora')
            } else if (puntosComputadora > 21) {
                alert('Ganó el Jugador')
            } else { alert('Computadora ganó') }

        }, 100);
    }

    const turnoComputadora = (puntosMinimos) => {
        
        let puntosComputadora = 0;

        do {
            //FUNCION PARA SUMAR PUNTOS DE LA CARTA 
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while ((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
        
        determinarGanador();
    }


    //Eventos

    btnPedir.addEventListener('click', () => {

        //FUNCION PARA SUMAR PUNTOS DE LA CARTA 
        const carta = pedirCarta();
        const puntosJugador = acumularPuntos(carta, 0);

        crearCarta(carta, 0);


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

        turnoComputadora(puntosJugadores[0]);
    });


    // btnNuevo.addEventListener('click', () => {

    //     inicializarJuego();

    // });

    return {
        nuevoJuego: inicializarJuego
    };

})();

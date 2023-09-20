

let deck = [];
const tipos      = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];

// Esta función crea un nuevo deck
const crearDeck = () => {

    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo);
        }
    }

    // console.log(deck);

    
    for( let tipo of tipos ) {
        for( let especial of especiales ) {
            deck.push( especial + tipo);
        }
    }
    // console.log( deck );

    //ACA SE UTILIZA LIBRERIA PARA ELEGIR AL AZAR UNDERSCORE
    deck = _.shuffle( deck );
    console.log( deck );
    return deck;
}

crearDeck();

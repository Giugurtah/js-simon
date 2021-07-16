//*Variabili globali
// Sezione di selezione difficoltà e avvio gioco
const difficultyLevel = document.getElementById("difficulty_level");
const generateNumbersButton = document.getElementById("generate_numbers");
// Sezione di stampa numeri ed avvio countdown 
const generatedNumbers = document.getElementById("generated_numbers");
const startCountdownButton = document.getElementById("start_countdown");
// Sezione di stampa del conto alla rovescia
const countdown = document.getElementById("countdown");
// Sezione di inserimento numeri
const numberForm = document.getElementById("number_form");
const submittedNumbers = document.getElementById("submitted_numbers");
const submitButton = document.getElementById("submit_button");
// Sezione di stampa punteggio finale
const finalScore = document.getElementById("final_score");
const resetButton = document.getElementById("reset");
// Variabili numeriche
let randomNumbers = [];
let points = 0;


generateNumbersButton.addEventListener ("click", function(){
    //Genero i numeri tramite funzione
    randomNumbersGenerator(randomNumbers, parseInt(difficultyLevel.value));
    //Stampo i numeri e compare il bottone di avvio countdown
    generatedNumbers.innerText = "I numeri generati sono: " + randomNumbers;
    generateNumbersButton.classList.add("hidden");
    startCountdownButton.classList.remove("hidden");
});

startCountdownButton.addEventListener ("click", function(){
    //Nascondo i numeri e il pulsante stesso
    const startingTime = 2; //Il tempo iniziale viene dichiarato nel codice, ma potrebbe essere anche inserito dall'utente tramite input
    generatedNumbers.innerText = "";
    this.classList.add("hidden");

    //Tramite funzione faccio partire il countdown
    countdownFunction(countdown, startingTime, 10);
    //Al termine del tempo specificato nascondo la sezione di countdown e faccio apparire il form per inserire i numeri
    setTimeout(function(){
        countdown.innerText = "Il tempo è finito!!!"
        numberForm.classList.remove("hidden");
    }, startingTime*1000);
})


submitButton.addEventListener ("click", function(){
    //Prendo i numeri e li divido in un array
    const submittedNumbersAux = submittedNumbers.value.split(",");
    for (var i=0; i<submittedNumbersAux.length; i++) {
        //Controllo se i valori inseriti fanno parte dell'array di numeri generati dal codice e conto i punti
        if (randomNumbers.includes(parseInt(submittedNumbersAux[i]))) {
            points++;
        }
    }

    //Calcolato il punteggio finale lo stampo e nascondo il form di inserimento numeri
    finalScore.innerText = "I numeri inseriti sono " + submittedNumbersAux + " ed i numeri generati dal gioco sono " + randomNumbers + " quindi hai totalizzato " + points + " punti";
    numberForm.classList.add("hidden");
    countdown.innerText = "";
    resetButton.classList.remove("hidden");
})

resetButton.addEventListener ("click", function(){
    //Azzero, nascondo e mostro vari elementi per resettare la partita
    difficultyLevel.value = "5";
    submittedNumbers.value = "";
    submittedNumbersArray = [];
    generateNumbersButton.classList.remove("hidden");
    randomNumbers = [];
    points = 0;
    finalScore.innerText = "";
    resetButton.classList.add("hidden");
})

function randomNumbersGenerator (array, number) {
    //Funione che genera n=number numeri casuali diversi e li inserisce in un dato array
    while (array.length !== number) {
        const randomNumberAux = Math.floor(Math.random() * 100 + 1);
        if (!array.includes(randomNumberAux)) {
            array.push(randomNumberAux);
        }
    } 
    console.table(randomNumbers);
}

function countdownFunction (element, number_beginning, number_steps) {
    //Funzione che chiede un elemento in cui stampare il countdown, i secondi iniziali e gli steps (espressi in centesimi di secondi)
    element.innerText = number_beginning.toFixed(2);
    const clock = setInterval(function(){
        //Partendo dal valore inziale, ad ogni step l'elemento viene sovrascritto con il tempo diminuito
        number_beginning -= number_steps*(0.01);
        element.innerText = number_beginning.toFixed(2);
    }, number_steps*10);

    setTimeout(function(){
        //Dopo un tempo pari ai secondi iniziali indicati, il countdown si ferma
        clearInterval(clock);
    }, number_beginning*1000);
}


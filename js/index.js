//Variabili globali
const difficultyLevel = document.getElementById("difficulty_level");
const generateNumbersButton = document.getElementById("generate_numbers");
const generatedNumbers = document.getElementById("generated_numbers");
const startCountdownButton = document.getElementById("start_countdown");
const countdown = document.getElementById("countdown");
const numberForm = document.getElementById("number_form");
const submittedNumbers = document.getElementById("submitted_numbers");
const submitButton = document.getElementById("submit_button");
let randomNumbers = [];

generateNumbersButton.addEventListener ("click", function(){
    //Al click del bottone generate_numbers viene riempito l'array con quanti numeri scelti dall'utente e vengono poi stampati
    randomNumbersGenerator(randomNumbers, parseInt(difficultyLevel.value));
    generatedNumbers.innerText = "I numeri generati sono: " + randomNumbers;
    startCountdownButton.classList.remove("hidden");
});

startCountdownButton.addEventListener ("click", function(){
    //Al click del bottone start_countdown vengono rimossi i numeri e il bottone stesso, e parte il conto alla rovescia
    generatedNumbers.innerText = "";
    this.classList.add("hidden");
    countdownFunction(countdown, 5, 10);
    setTimeout(function(){
        countdown.innerText = "Il tempo è finito!!!"
        numberForm.classList.remove("hidden");
    }, 5*1000);
})


submitButton.addEventListener ("click", function(){
    const submittedNumbersArray = submittedNumbers.value.split(",");
    for (var i=0; i<submittedNumbersArray.length; i++) {
        if (randomNumbers.includes(submittedNumbersArray[i])) {
            
        }
    }
    console.table(submittedNumbersArray);
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
    //Funzione che chiede un elemento in cui stampare il countdown, i secondi iniziali e gli steps (espressi in centesimi di secondi) di cui si vogliono mostrare le variazioni
    element.innerText = number_beginning.toFixed(2);
    const clock = setInterval(function(){
        //Partendo dal valore inziale, ad ogni step viene sovrascritto l'elemento con il tempo diminuito
        number_beginning -= number_steps*(0.01);
        element.innerText = number_beginning.toFixed(2);
    }, number_steps*10);

    setTimeout(function(){
        //Dopo un tempo pari ai secondi iniziali indicati, il countdown si ferma
        clearInterval(clock);
    }, number_beginning*1000);
}


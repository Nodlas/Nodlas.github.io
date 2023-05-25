/**
 * Se detta som en grund att utgå ifrån.
 * Det är helt fritt att ändra och ta bort kod om ni
 * önskar lösa problemen med andra metoder.
 */

let lcd = null; // displayen

let memory = 0; // Lagrat/gamlat värdet från display
let arithmetic = null; // Vilken beräkning som skall göras +,-, x eller /
let check;

function init() {
    lcd = document.getElementById('lcd');
    let keyBoard = document.getElementById('keyBoard')
    keyBoard.onclick = buttonClick;
}

/**
 * Händelsehanterare för kalkylatorns tangentbord
 */
function buttonClick(e) {
    let btn = e.target.id; //id för den tangent som tryckte ner


    // kollar om siffertangent är nedtryckt
    if (btn.substring(0, 1) === 'b') {
        let digit = btn.substring(1, 2); // plockar ut siffran från id:et
        addDigit(digit);

    } else { // Inte en siffertangent, övriga tangenter.
        switch(btn) {
            case 'comma':
                addComma()
                break;
            case 'add':
            case 'sub':
            case 'mul':
            case 'div':
                setOperator(btn)
                break;
            case 'enter':
                calculate()
                break;
            case 'clear':
                memClear()
                break;
        }
    }
}

/**
 *  Lägger till siffra på display.
 */
function addDigit(digit) {
    if(check) {
        document.getElementById('lcd').value = ''
        check = false;
    }
    document.getElementById('lcd').value += digit;
}

/**
 * Lägger till decimaltecken
 */
function addComma() {
    document.getElementById('lcd').value += '.';
}

/**
 * Sparar operator.
 * +, -, *, /
 */
function setOperator(operator) {
    memory = document.getElementById('lcd').value   //Sparar värdet i display
    check = true;
    switch(operator) {  //Ändrar värdet i displayn till en av operatorerna och sätter arithmetic till en operator
        case 'add':
            document.getElementById('lcd').value = '+'; 
            arithmetic = '+';
            break;
        case 'sub':
            document.getElementById('lcd').value = '-';
            arithmetic = '-';
            break;
        case 'mul':
            document.getElementById('lcd').value = 'x';
            arithmetic = 'x';
            break;
        case 'div':
            document.getElementById('lcd').value = '/';
            arithmetic = '/';
            break;
    }
}

/**
 * Beräknar ovh visar resultatet på displayen.
 */
function calculate() {
    let counting = document.getElementById('lcd').value;    //Sparar nuvarande värdet i displayn
    let svar = conversion(memory,counting);
    document.getElementById('lcd').value = svar;
}

function conversion(first,second) {
    let result;
    let x = 0;
    if(first < 0 || second < 0) {
        if(first <= second) {
            while(first > -1) {
                first = first *10;
                second = second *10;
                x++;
            }
        }
        else if(second < first) {
            while(second > -1) {
                second = second *10;
                first = first *10;
                x++;
            }
        }
    }
    else{
        if(first <= second) {
            while(first < 1) {
                first = first *10;
                second = second *10;
                x++;
            }
        }
        else if(second < first) {
            while(second < 1) {
                second = second *10;
                first = first *10;
                x++;
            }
        }
    }
    switch(arithmetic) {
        case '+':
            result = (+first + +second)/(Math.pow(10,x));  //Använder + före för att specificera att vi ska addera och inte slå ihop
            break;
        case '-':
            result = (first - second)/(Math.pow(10,x));
            break
        case 'x':
            result = (first * second)/(Math.pow(10,(2*x)));
            break;
        case '/':
            result = (first / second);
            break;
    }
    return result;
}

/** Rensar display */
function clearLCD() {
    lcd.value = '';
    isComma = false;
}

/** Rensar allt, reset */
function memClear(){
    memory = 0;
    arithmetic = null;
    clearLCD();
}

window.onload = init;

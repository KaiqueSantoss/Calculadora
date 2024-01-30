/* 

Dar interações ao botão de  '='
button resultado - um condicional para resultado continuo, aperta ele depois de um resultado. 
dois - caso digite um novo número e apertar o butão, o condicional continua e o n2 tbm.

pensar em uma lógica que têm setFirstNumber, resultForCall, OperatorLock.

 */
let upScreen = document.getElementById('upScreen');
let downScreen = document.getElementById('downScreen');
downScreen.innerText = 0;
let dot = document.getElementsByClassName('dot')[0];
let zero = document.getElementById('0');
let result = document.getElementById('result');
let n1 = null;
let n2 = null;
let resultado = null;

let OldNumber = false;
let setFirstNumber = false;
let setSecondNumber = false;

let lockDot = false;
//dependendo o dotForResult pode sair 
let dotForResult = false;


let resultForCall = false;
let OperatorLock = false;

let symbolOperator = null;





let callOperator = false; // Ele é relacionado aos operadores aritmetidcos e nele ocorre a definição do meu n1.

document.addEventListener('DOMContentLoaded',()=>{
    let operator = document.querySelectorAll('.operator')
    let numb = document.querySelectorAll('.numb');
    dot.addEventListener('click',dotClick)
    zero.addEventListener('click',zeroClick)
    result.addEventListener('click',resultClick)

    operator.forEach((ope)=>{
        ope.addEventListener('click',operatorClick)
    })

    numb.forEach((num)=>{
    num.addEventListener('click',numberClick);
  })
})

function numberClick(numb){
    if(!setFirstNumber){
    let divNumber = numb.target;
    let number =  divNumber.id;
    SetNumber(number);
    }

    
    clickForSecondNumber()
    if(setSecondNumber){
    let divNumber = numb.target;
    let number =  divNumber.id;
    SetNumber(number);
    }
}
function SetNumber(number){
    //Primerio número digitado
    if(!setFirstNumber){
    if(!OldNumber){
        downScreen.innerText = number;
        OldNumber = true;
     } 
        else{
        downScreen.innerText += number;
     }
    }
      if(setSecondNumber){
        if(!OldNumber){
            downScreen.innerText = number;
            OldNumber = true;
         } 
            else{
            downScreen.innerText += number;
         }
        }
      }
function clickForSecondNumber(){
    //Pode ser separado
 
    if(!setSecondNumber && setFirstNumber && callOperator){
         setSecondNumber = true;
         OldNumber = false;
         return true;
    }

    return false
}


function dotClick(){
     dotButton  = dot.innerText
        // logíca pós resultado
     if(dotForResult && !OldNumber){
        downScreen.innerText = 0 + dotButton;
        OldNumber = true;
        dotForResult = false;
        lockDot = true;
        console.log('DotForResult')
     }
        // lógica primeiro ponto da tela| lembrar de colocar primeiro |
    if(!lockDot && !setFirstNumber){
        downScreen.innerText += dotButton;
        lockDot = true;
        OldNumber = true;
       
     }

    //logica para segundo número 
        clickForSecondNumber()
     if(!lockDot && setSecondNumber){
        if(!OldNumber){
        downScreen.innerText = 0 + dotButton;
        lockDot = true;
        OldNumber = true;
       
        }else{
            downScreen.innerText += dotButton;
            lockDot = true;
            OldNumber = true;
        }
     }

    
    
}

function zeroClick(){

    //Lógica - primeiro número digitado antes do sinal

    if(!setFirstNumber){
     if(parseInt(downScreen.innerText) !== 0 || lockDot){
        downScreen.innerText += zero.id;
     }
    if(!OldNumber){
        downScreen.innerText = zero.id;
       
    }  
}
//Lógica - segundo número digitado apos um operacional
clickForSecondNumber()
if(setSecondNumber){
    if(parseInt(downScreen.innerText) !== 0  || lockDot){
       downScreen.innerText += zero.id;
       
    }
   if(!OldNumber){
       downScreen.innerText = zero.id;
       
   }  
}


}




    



function resultClick(){
    // Ajustar a condição para n1 sem n2
    // pode sair
    if(!setFirstNumber && !callOperator && !setSecondNumber){
        
        n1 = downScreen.innerText;
        upScreen.innerText = n1 +'=';

        OldNumber = false;
        lockDot = false;
        dotForResult = true;

       }

       ButtonForResult(symbolOperator)
}

 


function operatorClick(symbol){
    let container = symbol.target;
    let operator = container.innerText;

    if(!setFirstNumber && !callOperator){
    setFirstNumber = true;
    callOperator = true;
    lockDot = false;
    }

    switch(operator){
        case '+':
        arithmeticCall(operator)
        arithmeticCalc(operator)
        symbolOperator =  operator
        break;
        case'-':
        arithmeticCall(operator)
        arithmeticCalc(operator)
        break;
        case'x':
        arithmeticCall(operator)
        arithmeticCalc(operator)

        break;
        case'÷':
        arithmeticCall(operator)
        arithmeticCalc(operator)

        break;
        case'+/-':
        
        break;
    }
}

function arithmeticCall(symbol){

    if(symbol == '+' && setFirstNumber){
        n1 = parseFloat(downScreen.innerText);
        upScreen.innerText = n1 + " + ";
        
    }

    if(symbol == '-' && setFirstNumber ){
        n1 = parseFloat(downScreen.innerText);
        upScreen.innerText = n1 + " - ";
        
    }

    if(symbol == 'x' && setFirstNumber ){
        n1 = parseFloat(downScreen.innerText);
        upScreen.innerText = n1 + " x ";
        
    }

    if(symbol == '÷' && setFirstNumber ){
        n1 = parseFloat(downScreen.innerText);
        upScreen.innerText = n1 + " ÷ ";
        
    }
}

function arithmeticCalc(symbol){
switch(symbol){
    case '+':
 
    break;
    case '-':
        console.log(symbol)
    break;
    case 'x':
        console.log(symbol)
    break;
    case '+':
        console.log(symbol)

    break;
    case '÷':
        console.log(symbol)

    break;
    case'+/-':
    console.log(symbol)

    break;
  

}
}

function ButtonForResult(symbol){
    switch(symbol){
        case '+':

            if(setFirstNumber  && callOperator && !setSecondNumber && !resultForCall){
                n2 = n1;
                upScreen.innerText =  n1 + ' + ' + n2;
                resultado = n1 + n2 
                downScreen.innerText = resultado
                
               
                OldNumber = false;
                lockDot = false;
                dotForResult = false;

                resultForCall = true;
                callOperator = false
                console.log(1)
           }

             else if(setFirstNumber && !OldNumber && resultForCall && !callOperator){
              n1 = resultado
              upScreen.innerText = n1 + ' + ' + n2
              resultado = n1 + n2
              downScreen.innerText = resultado  

              
              OldNumber = false;
              lockDot = false;
              dotForResult = false;
              resultForCall = true;
              console.log(2)
           }

            else if(OldNumber && resultForCall){
        

                console.log(3)
           } 
        break;
        case '-':

        break;
        case 'x':
         
        break;
        case '+':
            
    
        break;
        case '÷':
           
    
        break;
        case'+/-':
    
    
        break;
      
    
    }
    }









/* 
Dar uma lógica melhor para o OperatorDiff, tentar pensar em uma maneira de definir ele melhor, ou mudar o symbol Operator.

Arrumar a lógicas de operadores combinados exemplo:
 
2 - 4 = 2 + 
2 * 5 = 10 - 

Arrumar a troca de sinais  depos de um resultado :


 */
let tradeButton = document.getElementById('negOurPositiv')
let upScreen = document.getElementById('upScreen');
let downScreen = document.getElementById('downScreen');
downScreen.innerText = 0;
let modoNoturno = document.getElementById('change');
let resetButton = document.getElementById('reset');
let cleanButton = document.getElementById('clean');
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

// Pioridade
let OperatorLock = false;

let symbolDefined = null;
let symbolOperator = null;

let negOurPosit = false;
let noturno = true;

let callOperator = false; // Ele é relacionado aos operadores aritmetidcos e nele ocorre a definição do meu n1.

document.addEventListener('DOMContentLoaded',()=>{

    let operator = document.querySelectorAll('.operator');
    let numb = document.querySelectorAll('.numb');
    modoNoturno.addEventListener('click',changeColors);
    tradeButton.addEventListener('click',tradeSign);
    dot.addEventListener('click',dotClick);
    zero.addEventListener('click',zeroClick);
    result.addEventListener('click',resultClick);
    resetButton.addEventListener('click',resetClick);
    cleanButton.addEventListener('click',cleanClick);
    operator.forEach((ope)=>{
        ope.addEventListener('click',operatorClick);
    })

    numb.forEach((num)=>{
    num.addEventListener('click',numberClick);
  })
})


function clickForFirstNumber(){
    if(!setFirstNumber && !callOperator && !setSecondNumber){
        setFirstNumber = true;
        return true
    }if(resultForCall){
    
        resultForCall = false;
    }
    return false
}

function numberClick(numb){
        clickForFirstNumber()
   
        if(!setFirstNumber && !setSecondNumber && !callOperator){
        let divNumber = numb.target;
        let number =  divNumber.id;
        upScreen.innerText = '';
        SetNumber(number);
    }
    else if(setFirstNumber && !setSecondNumber && !callOperator){
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
    if(setFirstNumber && !setSecondNumber){
    if(!OldNumber){
        downScreen.innerText = number;
        OldNumber = true;
     } 
     else if(limitOfCaract()){
        downScreen.innerText += number;
     }
        
    }
      if(setSecondNumber){
        if(!OldNumber){
            
            downScreen.innerText = number;
            OldNumber = true;
         } 
            else if(limitOfCaract()){
            downScreen.innerText += number;
         }
       
        }
      }
function clickForSecondNumber(){
    //Pode ser separado
   
    if(!setSecondNumber && setFirstNumber && callOperator){
         setSecondNumber = true;
         OperatorLock = true;
         symbolDefined = symbolOperator;
         console.log('segundo número');
         return true;
        
    }
    if(resultForCall){
        resultForCall = false;
    }
    return false
}


function dotClick(){
     dotButton  = dot.innerText
        // logíca pós resultado
        clickForFirstNumber()
     if(dotForResult && !OldNumber){
        downScreen.innerText = 0 + dotButton;
        OldNumber = true;
        dotForResult = false;
        lockDot = true;
        console.log('DotForResult');
     }
        // lógica primeiro ponto da tela| lembrar de colocar primeiro |
    if(!lockDot && setFirstNumber && !setSecondNumber && !callOperator){
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
    clickForFirstNumber()
    if(setFirstNumber && !setSecondNumber && !callOperator){
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
   
    if(setFirstNumber  && !callOperator && !setSecondNumber && !resultForCall){
        // clickForFirstNumber()
        n1 = parseFloat(downScreen.innerText);
        resultado = n1; 
        upScreen.innerText = resultado +'=';
        OldNumber = false;
        lockDot = false;
        dotForResult = true;
        negOurPosit = false;
        resultForCall = true;
       }
  
       ButtonForResult(symbolDefined)
}

function operatorDifferent(){
    if(OperatorDiff !== null){
    let change = symbolOperator ===  OperatorDiff ? true : false;}
    return false
    
}
 


function operatorClick(symbol){
    let container = symbol.target;
    let operator = container.innerText;
    
    if(setFirstNumber && !callOperator){
    callOperator = true;
    lockDot = false;
    OldNumber = false;
    }

    switch(operator){
        case '+':
        if(!OperatorLock && !setSecondNumber && !resultForCall){
        console.log('1')
        arithmeticCall(operator)
        
        
        }
        else if(!setSecondNumber && !OperatorLock && resultForCall){
            console.log('2')
            arithmeticCall(operator)
        }     

        else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined === operator ){
            console.log('3')
            arithmeticCalc(operator)
        }
        else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined !== operator ){
            console.log('3.1')
            arithmeticCalc(operator)
        }
        else if(resultForCall && !OperatorLock){
            arithmeticCalc(operator)
            console.log('4')
        }
        

        break;
        case'-':

        if(!OperatorLock && !setSecondNumber && !resultForCall){
            console.log('1')
            arithmeticCall(operator)
            
            
            }
            else if(!setSecondNumber && !OperatorLock && resultForCall){
                console.log('2')
                arithmeticCall(operator)
            }     
    
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined === operator ){
                console.log('3')
                arithmeticCalc(operator)
            }
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined !== operator ){
                console.log('3.1')
                arithmeticCalc(operator)
            }
            else if(resultForCall && !OperatorLock){
                arithmeticCalc(operator)
                console.log('4')
            }
      
        break;
        case'x':
        if(!OperatorLock && !setSecondNumber && !resultForCall){
            console.log('1')
            arithmeticCall(operator)
            
            
            }
            else if(!setSecondNumber && !OperatorLock && resultForCall){
                console.log('2')
                arithmeticCall(operator)
            }     
    
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined === operator ){
                console.log('3')
                arithmeticCalc(operator)
            }
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined !== operator ){
                console.log('3.1')
                arithmeticCalc(operator)
            }
            else if(resultForCall && !OperatorLock){
                arithmeticCalc(operator)
                console.log('4')
            }

        break;
        case'÷':
        if(!OperatorLock && !setSecondNumber && !resultForCall){
            console.log('1')
            arithmeticCall(operator)
            
            
            }
            else if(!setSecondNumber && !OperatorLock && resultForCall){
                console.log('2')
                arithmeticCall(operator)
            }     
    
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined === operator ){
                console.log('3')
                arithmeticCalc(operator)
            }
            else  if(OperatorLock && setSecondNumber && callOperator && symbolDefined !== operator ){
                console.log('3.1')
                arithmeticCalc(operator)
            }
            else if(resultForCall && !OperatorLock){
                arithmeticCalc(operator)
                console.log('4')
            }

        break;

    }
}

function arithmeticCall(symbol){
    switch(symbol){
        case '+':
           
            if (setFirstNumber && !setSecondNumber ){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + " + "; 
                symbolOperator =  symbol
                console.log(symbolOperator)
                
                console.log('1 +')
            }   
           else if(OperatorLock && setSecondNumber && symbolOperator === '+'){
                n2 = parseFloat(downScreen.innerText);
                upScreen.innerText = resultado + " + "
                downScreen.innerText = resultado
                console.log('2 +')
            }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
                console.log('3 +')
                symbolOperator =  symbol
                n1 = resultado
                upScreen.innerText = resultado + " + "
                downScreen.innerText = resultado
                setFirstNumber = true;
                callOperator = true;
               
            }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
                console.log('4 +')
                n1 = resultado
                upScreen.innerText = resultado + " + "
                downScreen.innerText = resultado
                symbolOperator =  symbol
                setFirstNumber = true;
                callOperator = true;
                clickForSecondNumber()
                console.log('symbol Op2')
            }
       
        break;
        case '-':

        if (setFirstNumber && !setSecondNumber ){
            n1 = parseFloat(downScreen.innerText);
            upScreen.innerText = n1 + " - "; 
            symbolOperator =  symbol
            console.log(symbolOperator)
            console.log('1 -')
        }   
       else if(OperatorLock && setSecondNumber && symbolOperator === '-'){
            n2 = parseFloat(downScreen.innerText);
            upScreen.innerText = resultado + " - "
            downScreen.innerText = resultado
            console.log('2 -')
        }else if(!setFirstNumber && !setSecondNumber && resultForCall){
            symbolOperator =  symbol
            n1 = resultado
            upScreen.innerText = resultado + " - "
            downScreen.innerText = resultado
            setFirstNumber = true;
            callOperator = true;
          
        }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
         
            n1 = resultado
            upScreen.innerText = resultado + " - "
            downScreen.innerText = resultado
            symbolOperator =  symbol
            setFirstNumber = true;
            callOperator = true;
            clickForSecondNumber()
            console.log('4 -')
        }

        break;
        case 'x':
            if (setFirstNumber && !setSecondNumber ){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + " x "; 
                symbolOperator =  symbol
                console.log(symbolOperator)
                
                console.log('1 X')
            }   
           else if(OperatorLock && setSecondNumber && symbolOperator === 'x'){
                n2 = parseFloat(downScreen.innerText);
                upScreen.innerText = resultado + " x "
                downScreen.innerText = resultado
                console.log('2 X')
            }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
                console.log('3 X')
                symbolOperator =  symbol
                n1 = resultado
                upScreen.innerText = resultado + " x "
                downScreen.innerText = resultado
                setFirstNumber = true;
                callOperator = true;
               
            }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
                console.log('4 x')
                n1 = resultado
                upScreen.innerText = resultado + " x "
                downScreen.innerText = resultado
                symbolOperator =  symbol
                setFirstNumber = true;
                callOperator = true;
                clickForSecondNumber()
                console.log('symbol Op2')
            }
        break;
    
        case '÷':
            if (setFirstNumber && !setSecondNumber ){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + " ÷ "; 
                symbolOperator =  symbol
                console.log(symbolOperator)
                
                console.log('1 ÷')
            }   
           else if(OperatorLock && setSecondNumber && symbolOperator === '÷'){
                n2 = parseFloat(downScreen.innerText);
                upScreen.innerText = resultado + " ÷ "
                downScreen.innerText = resultado
                console.log('2 ÷')
            }else if(!setFirstNumber && !setSecondNumber && resultForCall ){
                console.log('3 ÷')
                symbolOperator =  symbol
                n1 = resultado
                upScreen.innerText = resultado + " ÷ "
                downScreen.innerText = resultado
                setFirstNumber = true;
                callOperator = true;
               
            }else if(!setFirstNumber && !setSecondNumber && resultForCall){
                console.log('4 ÷')
                n1 = resultado
                upScreen.innerText = resultado + " ÷ "
                downScreen.innerText = resultado
                symbolOperator =  symbol
                setFirstNumber = true;
                callOperator = true;
                clickForSecondNumber()
                console.log('symbol Op2')
            }
    
        break;
        }
    
      
    }

    


 


function arithmeticCalc(symbol){
    console.log(symbol)
switch(symbol){
    
    case '+':


        if(OperatorLock && setSecondNumber && symbolDefined == "+"){
            n2 = parseFloat(downScreen.innerText);
            resultado =  n1 + n2 ;
            arithmeticCall(symbol)
            n1 = resultado
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setSecondNumber = true;
            resultForCall = true;
            callOperator = true;
            OperatorLock = false;
            setSecondNumber = false;
            symbolDefined = null;
            console.log('arithenCall 1')
        } 
        if(symbolDefined !== null && symbol !== symbolDefined){
        if(symbolDefined == '-'){
            console.log('- e +');
            n2 = parseFloat(downScreen.innerText);
            resultado = n1 - n2;
            upScreen.innerText = resultado + ' + ';
            downScreen.innerText = resultado;
            n1 = resultado;
            lockDot = false;
            dotForResult = true;
            OldNumber = false;
            setFirstNumber = true;
            setSecondNumber = false;
            resultForCall =true;
            OperatorLock = false;
            callOperator = true;
            symbolOperator = symbol;
            symbolDefined = null;
       }
       if(symbolDefined == 'x'){
        console.log('x e +');
        n2 = parseFloat(downScreen.innerText);
        resultado = n1 * n2;
        upScreen.innerText = resultado + ' + ';
        downScreen.innerText = resultado;
        n1 = resultado;
        lockDot = false;
        dotForResult = true;
        OldNumber = false;
        setFirstNumber = true;
        setSecondNumber = false;
        resultForCall =true;
        OperatorLock = false;
        callOperator = true;
        symbolOperator = symbol;
        symbolDefined = null;
       }
    if(symbolDefined == '÷'){
    console.log('÷ e +');
    n2 = parseFloat(downScreen.innerText);
    resultado = n1 / n2;
    upScreen.innerText = resultado + ' + ';
    downScreen.innerText = resultado;
    n1 = resultado;
    lockDot = false;
    dotForResult = true;
    OldNumber = false;
    setFirstNumber = true;
    setSecondNumber = false;
    resultForCall =true;
    OperatorLock = false;
    callOperator = true;
    symbolOperator = symbol;
    symbolDefined = null;
}
        }
   

    break;
    case '-':
        if(OperatorLock && setSecondNumber && symbolDefined == "-"){
            n2 = parseFloat(downScreen.innerText);
            resultado =  n1 - n2 ;
            arithmeticCall(symbol)
            n1 = resultado
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setSecondNumber = true;
            resultForCall = true;
            callOperator = true;
            OperatorLock = false;
            setSecondNumber = false;
            symbolDefined = null;
            console.log('arithenCall 1')
        } 
        if(symbolDefined !== null && symbol !== symbolDefined){
        if(symbolDefined == '+'){
            console.log('+ e -');
            n2 = parseFloat(downScreen.innerText);
            resultado = n1 + n2;
            upScreen.innerText = resultado + ' - ';
            downScreen.innerText = resultado;
            n1 = resultado;
            lockDot = false;
            dotForResult = true;
            OldNumber = false;
            setFirstNumber = true;
            setSecondNumber = false;
            resultForCall =true;
            OperatorLock = false;
            callOperator = true;
            symbolOperator = symbol;
            symbolDefined = null;
       }
       if(symbolDefined == 'x'){
        console.log('x e -');
        n2 = parseFloat(downScreen.innerText);
        resultado = n1 * n2;
        upScreen.innerText = resultado + ' - ';
        downScreen.innerText = resultado;
        n1 = resultado;
        lockDot = false; 
        OldNumber = false;
        setFirstNumber = true;
        setSecondNumber = false;
        resultForCall =true;
        OperatorLock = false;
        callOperator = true;
        symbolOperator = symbol;
        symbolDefined = null;
       }
    if(symbolDefined == '÷'){
    console.log('÷ e -');
    n2 = parseFloat(downScreen.innerText);
    resultado = n1 / n2;
    upScreen.innerText = resultado + ' - ';
    downScreen.innerText = resultado;
    n1 = resultado;
    lockDot = true; 
    OldNumber = false;
    setFirstNumber = true;
    setSecondNumber = false;
    resultForCall =true;
    OperatorLock = false;
    callOperator = true;
    symbolOperator = symbol;
    symbolDefined = null;
        }
        }
   
    break;
    case 'x':
        if(OperatorLock && setSecondNumber && symbolDefined == "x"){
            n2 = parseFloat(downScreen.innerText);
            resultado =  n1 * n2 ;
            arithmeticCall(symbol)
            n1 = resultado
            OldNumber = false;
            lockDot = true; 
            setSecondNumber = true;
            resultForCall = true;
            callOperator = true;
            OperatorLock = false;
            setSecondNumber = false;
            symbolDefined = null;
            console.log('arithenCall 1')
        } 
        if(symbolDefined !== null && symbol !== symbolDefined){
        if(symbolDefined == '+'){
            console.log('+ e x');
            n2 = parseFloat(downScreen.innerText);
            resultado = n1 + n2;
            upScreen.innerText = resultado + ' x ';
            downScreen.innerText = resultado;
            n1 = resultado;
            lockDot = true; 
            OldNumber = false;
            setFirstNumber = true;
            setSecondNumber = false;
            resultForCall =true;
            OperatorLock = false;
            callOperator = true;
            symbolOperator = symbol;
            symbolDefined = null;
       }
       if(symbolDefined == '-'){
        console.log('- e x');
        n2 = parseFloat(downScreen.innerText);
        resultado = n1 - n2;
        upScreen.innerText = resultado + ' x ';
        downScreen.innerText = resultado;
        n1 = resultado;
        lockDot = true; 
        OldNumber = false;
        setFirstNumber = true;
        setSecondNumber = false;
        resultForCall =true;
        OperatorLock = false;
        callOperator = true;
        symbolOperator = symbol;
        symbolDefined = null;
       }
    if(symbolDefined == '÷'){
    console.log('÷ e x');
    n2 = parseFloat(downScreen.innerText);
    resultado = n1 / n2;
    upScreen.innerText = resultado + ' x ';
    downScreen.innerText = resultado;
    n1 = resultado;
    lockDot = true; 
    OldNumber = false;
    setFirstNumber = true;
    setSecondNumber = false;
    resultForCall =true;
    OperatorLock = false;
    callOperator = true;
    symbolOperator = symbol;
    symbolDefined = null;
}
        }
    break;

    case '÷':
        if(OperatorLock && setSecondNumber && symbolDefined == "÷"){
            n2 = parseFloat(downScreen.innerText);
            resultado =  n1 + n2 ;
            arithmeticCall(symbol)
            n1 = resultado
            OldNumber = false;
            lockDot = true; 
            setSecondNumber = true;
            resultForCall = true;
            callOperator = true;
            OperatorLock = false;
            setSecondNumber = false;
            symbolDefined = null;
            console.log('arithenCall 1')
        } 
        if(symbolDefined !== null && symbol !== symbolDefined){
        if(symbolDefined == '-'){
            console.log('- e ÷ ');
            n2 = parseFloat(downScreen.innerText);
            resultado = n1 - n2;
            upScreen.innerText = resultado + ' ÷ ';
            downScreen.innerText = resultado;
            n1 = resultado;
            lockDot = true; 
            OldNumber = false;
            setFirstNumber = true;
            setSecondNumber = false;
            resultForCall =true;
            OperatorLock = false;
            callOperator = true;
            symbolOperator = symbol;
            symbolDefined = null;
       }
       if(symbolDefined == '+'){
        console.log('+ e ÷ ');
        n2 = parseFloat(downScreen.innerText);
        resultado = n1 + n2;
        upScreen.innerText = resultLimitCaract(resultado); + ' ÷ ';
        downScreen.innerText = resultado;
        n1 = resultado;
        lockDot = true; 
        OldNumber = false;
        setFirstNumber = true;
        setSecondNumber = false;
        resultForCall =true;
        OperatorLock = false;
        callOperator = true;
        symbolOperator = symbol;
        symbolDefined = null;
       }
    if(symbolDefined == 'x'){
     console.log('x e ÷ ');
    n2 = parseFloat(downScreen.innerText);
    resultado = n1 * n2;
    upScreen.innerText = resultado + ' ÷ ';
    downScreen.innerText = resultLimitCaract(resultado);
    n1 = resultado;
    lockDot = true; 
    OldNumber = false;
    setFirstNumber = true;
    setSecondNumber = false;
    resultForCall =true;
    OperatorLock = false;
    callOperator = true;
    symbolOperator = symbol;
    symbolDefined = null;
}
        }

    break;
   
  

}
}

function ButtonForResult(symbol){
    
    if(symbol == null && resultForCall && !OldNumber){
        symbol = symbolOperator
    }
   else if(symbol == null && setFirstNumber && !setSecondNumber && callOperator){
        symbol = symbolOperator
    }
    switch(symbol){
        
        case '+':

            if(setFirstNumber  && callOperator && !setSecondNumber && !resultForCall){
                n2 = n1;
                upScreen.innerText =  n1 + ' + ' + n2;
                resultado = n1 + n2 
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                setFirstNumber = false;
                resultForCall = true;
                callOperator = false;
                OperatorLock = false;
                // console.log(1 + 'Soma de um número')
                symbolDefined = null;
           }
           else if(setFirstNumber && callOperator && !setSecondNumber && resultForCall){
            console.log('2 = 5 = 7')
            n2 = n1;
            upScreen.innerText =  n1 + ' + ' + n2;
            resultado = n1 + n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;
            symbolDefined = null;
            // console.log(1 + 'Soma de um número')
           }
           //Arrumar a lógica looping
            else if(resultForCall && !callOperator){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + ' + ' + n2;
                resultado = n1 + n2;
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                resultForCall = true;
                setFirstNumber = false;
                OperatorLock = false;
                symbolDefined = null;
                // console.log(2 + 'Looping');
           }
          else if(setFirstNumber  && callOperator && setSecondNumber && !resultForCall && symbolDefined !== null){
            n2 = parseFloat(downScreen.innerText);
            upScreen.innerText =  n1 + ' + ' + n2;
            resultado = n1 + n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            setSecondNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;


            symbolDefined = null;

            // console.log(3 + ' Soma de dois número')
         
           }
               

        

        break;
        case '-':
            if(setFirstNumber  && callOperator && !setSecondNumber && !resultForCall){
                n2 = n1;
                upScreen.innerText =  n1 + ' - ' + n2;
                resultado = n1 - n2 
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                setFirstNumber = false;
                resultForCall = true;
                callOperator = false;
                OperatorLock = false;
                symbolDefined = null;
                // console.log(1 + 'Menos resultado 1') 
             
           }

           else if(setFirstNumber && callOperator && !setSecondNumber && resultForCall){
            
            n2 = n1;
            upScreen.innerText =  n1 + ' - ' + n2;
            resultado = n1 - n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;
            symbolDefined = null;
            // console.log(1 + 'Soma de um número')
           }

           //Arrumar a lógica Looping
            else if(resultForCall){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + ' - ' + n2;
                resultado = n1 - n2;
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                resultForCall = true;
                setFirstNumber = false;
                OperatorLock = false;
                symbolDefined = null;
                // console.log(2 + 'Menos resultado 2') 
           }
          else if(setFirstNumber  && callOperator && setSecondNumber && !resultForCall && symbolDefined !== null ){
            n2 = parseFloat(downScreen.innerText);
            upScreen.innerText =  n1 + ' - ' + n2;
            resultado = n1 - n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            setSecondNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;
            symbolDefined = null;
            // console.log(3 + 'Menos resultado 3')
           }

        break;
        case 'x':
            if(setFirstNumber  && callOperator && !setSecondNumber && !resultForCall){
                n2 = n1;
                upScreen.innerText =  n1 + ' x ' + n2;
                resultado = n1 * n2 
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                setFirstNumber = false;
                resultForCall = true;
                callOperator = false;
                OperatorLock = false;
                // console.log(1 + 'Soma de um número')
                symbolDefined = null;
           }
           else if(setFirstNumber && callOperator && !setSecondNumber && resultForCall){
            console.log('2 = 5 = 7')
            n2 = n1;
            upScreen.innerText =  n1 + ' x ' + n2;
            resultado = n1 * n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;
            symbolDefined = null;
            // console.log(1 + 'Soma de um número')
           }
           //Arrumar a lógica
            else if(resultForCall && !callOperator){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + ' x ' + n2;
                resultado = n1 * n2;
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                resultForCall = true;
                setFirstNumber = false;
                OperatorLock = false;
                symbolDefined = null;
                // console.log(2 + 'Looping');
           }
          else if(setFirstNumber  && callOperator && setSecondNumber && !resultForCall && symbolDefined !== null){
            n2 = parseFloat(downScreen.innerText);
            upScreen.innerText =  n1 + ' x ' + n2;
            resultado = n1 * n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            setSecondNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;


            symbolDefined = null;

            // console.log(3 + ' Soma de dois número')
         
           }
        break;
        case '÷':
            if(setFirstNumber  && callOperator && !setSecondNumber && !resultForCall){
                n2 = n1;
                upScreen.innerText =  n1 + ' ÷ ' + n2;
                resultado = n1 / n2 
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                setFirstNumber = false;
                resultForCall = true;
                callOperator = false;
                OperatorLock = false;
                // console.log(1 + 'Soma de um número')
                symbolDefined = null;
           }
           else if(setFirstNumber && callOperator && !setSecondNumber && resultForCall){
        
            n2 = n1;
            upScreen.innerText =  n1 + ' ÷ ' + n2;
            resultado = n1 / n2 
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;
            symbolDefined = null;
            // console.log(1 + 'Soma de um número')
           }
           //Arrumar a lógica
            else if(resultForCall && !callOperator){
                n1 = parseFloat(downScreen.innerText);
                upScreen.innerText = n1 + ' ÷ ' + n2;
                resultado = n1 / n2;
                downScreen.innerText = resultLimitCaract(resultado);
                OldNumber = false;
                lockDot = false;
                dotForResult = true;
                resultForCall = true;
                setFirstNumber = false;
                OperatorLock = false;
                symbolDefined = null;
                // console.log(2 + 'Looping');
           }
          else if(setFirstNumber  && callOperator && setSecondNumber && !resultForCall && symbolDefined !== null){
            n2 = parseFloat(downScreen.innerText);
            upScreen.innerText =  n1 + ' ÷ ' + n2;
            resultado = n1 / n2 ;
            downScreen.innerText = resultLimitCaract(resultado);
            OldNumber = false;
            lockDot = false;
            dotForResult = true;
            setFirstNumber = false;
            setSecondNumber = false;
            resultForCall = true;
            callOperator = false;
            OperatorLock = false;


            symbolDefined = null;

            // console.log(3 + ' Soma de dois número')
         
           } 
    
        break;
      
 
    }
    }

    function tradeSign(){
    clickForFirstNumber()
    clickForSecondNumber()
    if(downScreen.innerText > 0 && !negOurPosit){
        downScreen.innerText = parseFloat(-downScreen.innerText);
        console.log('neg')
      negOurPosit = true;
    }else{
        downScreen.innerText = parseFloat(-downScreen.innerText);
        console.log('posi')
        negOurPosit = false;
    }
    }
    

    function resetClick(){
    upScreen.innerText =''
    downScreen.innerText = 0;
    n1 = null;
    n2 = null;
    resultado = null;
    OldNumber = false;
    setFirstNumber = false;
    setSecondNumber = false;
    lockDot = false;
    callOperator = false;
    dotForResult = false;
    resultForCall = false;
    OperatorLock = false;
    symbolOperator = null;
    symbolDefined = null;
    }   

    function cleanClick(){
        if(!resultForCall){
        clickForFirstNumber()
        clickForSecondNumber()
        downScreen.innerText = parseFloat(0);
        }
        else{
            clickForFirstNumber()
            clickForSecondNumber()
            resetClick()
        }
    }

  

    function limitOfCaract(){
        if(downScreen.innerText.length < 15 && !lockDot){
            return true;
        }
      else if(downScreen.innerText.length < 18 && lockDot){
        return true;
        }
        }


//  Resultados Mais Otimizados

// Notação cientifica 
 function resultLimitCaract(resultado){ 

   let numberTheResult = resultado.toString()
   console.log(resultado)

   if(Number.isInteger(resultado) === false && Number.isInteger(n1) === false && Number.isInteger(n2) === false){ 
             console.log('number decimal')

            if(isNotacion(numberTheResult)){
                console.log('verdeiro')
                return resultado
            }

            else if(numberTheResult.length >= 6){
        
            let numberOne = n1.toString().split('.');
           
            let oneDecimal = numberOne[1].length;
            
            let numberTwo = n2.toString().split('.');
            
            let twoDecimal = numberTwo[1].length;

            if(oneDecimal === twoDecimal){
                return resultado.toFixed(oneDecimal)
            }
            else if(oneDecimal > twoDecimal){
                return resultado.toFixed(oneDecimal)
            }
            else if(oneDecimal < twoDecimal){
                return resultado.toFixed(twoDecimal)
            }   
    
        }    
        
        

        else{
            return Number(resultado)
        }
 }


 else if(Number.isInteger(resultado) === true){
    console.log('number inteiro')
    if(isNotacion(numberTheResult)){
        resultado = Number(numberTheResult)
    }

   else if(numberTheResult.length >= 16){
        let numberChange = numberTheResult.slice(0,16)
            resultado = Number(numberChange)
          
    }
   else{
    return resultado
   }
   return resultado
}
else{
    
    if(isNotacion(resultado.toString())){
        return Number(resultado)
    }


    if(numberTheResult.length >= 16){
    let numberChange = numberTheResult.slice(0,16)
    resultado = Number(numberChange)
    return resultado
    }
    return resultado
}
}

// Notação cientifica 
function isNotacion(number){
let verificacion = /^[+\-]?\d+(\.\d+)?[eE][+\-]?\d+$/; 
return verificacion.test(number)
}


function verificarNumero(numero) {
    if (Number.isInteger(numero)) {
      console.log("O número é inteiro.");
    } else {
      console.log("O número é decimal.");
    }
  }

function changeColors(){

if(noturno){
    document.documentElement.style.setProperty('--color00', 'rgb(234, 248, 255)');
    document.documentElement.style.setProperty('--color01', 'rgba(67, 164, 255, 0.438)');
    document.documentElement.style.setProperty('--color02', 'rgb(158, 234, 255');
    document.documentElement.style.setProperty('--letter', 'rgb(0, 0, 0)');
    noturno = false;

}else if(!noturno){
    document.documentElement.style.setProperty('--color00', 'rgb(36, 34, 34)');
    document.documentElement.style.setProperty('--color01', 'rgb(56, 54, 54)');
    document.documentElement.style.setProperty('--color02', 'rgb(115, 121, 126)');
    document.documentElement.style.setProperty('--letter', 'rgb(255,255,255)');
    noturno = true;
}

}
let runningTotal = 0;
let buffer = "0";
let previousOperator;

const screen = document.querySelector('.screen');

function buttonClick(value){
  if(isNaN(value)){
    handleSymbol(value);
  }else{
    handleNumber(value);
  }
  screen.innerText = buffer;
}
 function handleSymbol(symbol){
   switch(symbol){
     case 'C':
       buffer = '0';
       runningTotal = 0;
       break
     case '=':
       if(previousOperator === null){
         return
       }
       flushOperation(parseInt(buffer));
       previousOperator = null;
       buffer = runningTotal;
       runningTotal = 0;
       break;
     case '←':
       if(buffer.length === 1){
         buffer = '0';
       }else{
         buffer = buffer.substring(0, buffer.length - 1)
       }
       break;
     case '+':
     case '−':
     case '×':
     case '÷':
       handleMath(symbol);
       break;
   }
 }


function handleMath(symbol){
  if(buffer === '0'){
    return;
  }
  
  const intBuffer = parseInt(buffer);
  
  if(runningTotal === 0){
    runningTotal = intBuffer;
  }else{
    flushOperation(intBuffer);
  }
  previousOperator = symbol;
  buffer = '0';
  
}

function flushOperation(intBuffer){
    if(previousOperator === '+'){
      runningTotal += intBuffer;
    }else if(previousOperator === '−'){
      runningTotal -= intBuffer;
    }else if(previousOperator === '×'){
      runningTotal *= intBuffer;
    }else if(previousOperator === '÷'){
      runningTotal /= intBuffer;
    }
}

function handleNumber(numberString){
  if(buffer === '0'){
    buffer = numberString;
  }else{
    buffer += numberString;
  }
}

function init(){
  document.querySelector('.calc-buttons').addEventListener('click', function(event){
  buttonClick(event.target.innerText);
  })
}

 var canvas = document.getElementById("myCanvas");
 var context = canvas.getContext("2d");
 var isDrawing = false;

 canvas.addEventListener("mousedown", startDrawing);
 canvas.addEventListener("mousemove", draw);
 canvas.addEventListener("mouseup", stopDrawing);
 canvas.addEventListener("mouseout", stopDrawing);
 function startDrawing(e) {
     isDrawing = true;
     draw(e); 
 }
 function draw(e) {
     if (!isDrawing) return;
     context.lineWidth = 2;
     context.lineCap = "round";
     context.strokeStyle = "#000";
     context.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
     context.stroke();
     context.beginPath();
     context.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
 }
 function stopDrawing() {
     isDrawing = false;
     context.beginPath();
 }
init();
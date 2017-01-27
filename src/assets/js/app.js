const bMin = document.querySelector('.b--min');
const sMin = document.querySelector('.s--min');
const bPlus = document.querySelector('.b--plus');
const sPlus = document.querySelector('.s--plus');
const sSes = document.querySelector('.span--session');
const sBreak = document.querySelector('.span--break');
const pTimer = document.querySelector('.p--timer');
const bTimer = document.querySelector('.b--timer');
const h2Type = document.querySelector('.h2--type');
const beep = new Audio('assets/beep.mp3');
beep.volume = 1;


const minOrPlus = (op, n)=>{
  if(op === 'min' && n.innerHTML > 1)
    n.innerHTML -= 1; 
  else if(op == 'plus' && n.innerHTML < 60)
    n.innerHTML = +n.innerHTML + 1; 

  if(n === sSes && h2Type.innerHTML === 'In Session')
    pTimer.innerHTML = sSes.innerHTML + ':00';
  else if(n === sBreak && h2Type.innerHTML === 'In Break')
    pTimer.innerHTML = sBreak.innerHTML + ':00';
};


//FUNCTIONS FOR TIMER
const setSecs = (mins, secs)=>{
  if(secs > 10)
    return mins + ':' + (secs-1);

  else if(secs > 0)
    return mins + ':0' + (secs-1);

  else
    return setMins(mins);
};

const setMins = (mins)=>{
  if(mins > 10)
    return (mins-1) + ':59';
  
  else if(mins > 0)
    return (mins-1) + ':59';
  
  else
    return '0:00';
};


const run = ()=>{
  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = true;

  const intervalID = setInterval(()=>{
    if(pTimer.innerHTML === '0:00'){
      beep.play();
      bTimer.onclick = ()=>{
        if(h2Type.innerHTML === 'In Session'){
          h2Type.innerHTML = 'In Break';
          pTimer.innerHTML = sBreak.innerHTML + ':00';
        }

        else{
          h2Type.innerHTML = 'In Session';
          pTimer.innerHTML = sSes.innerHTML + ':00';
        }
      };
    }

    else{
      bTimer.onclick = ()=>{
        clearInterval(intervalID);
        bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = false;
        bTimer.style.background = 'none';
        bTimer.onclick = ()=>{
          bTimer.style.background = 'yellow';
          run();
        };
      };

      if(h2Type.innerHTML === 'In Session'){
        pTimer.innerHTML = 
          setSecs(pTimer.innerHTML.split(':')[0],
                  pTimer.innerHTML.split(':')[1]);}

      else{
        pTimer.innerHTML = 
          setSecs(pTimer.innerHTML.split(':')[0],
                  pTimer.innerHTML.split(':')[1]);}
    }
  }, 1000);
};



//Settings
bMin.onclick = ()=>{minOrPlus('min', sBreak);};
sMin.onclick = ()=>{minOrPlus('min', sSes);};
bPlus.onclick = ()=>{minOrPlus('plus', sBreak);};
sPlus.onclick = ()=>{minOrPlus('plus', sSes);};

//Timer
bTimer.onclick = ()=>{
  bTimer.style.background = 'yellow';
  run();
};

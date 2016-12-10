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

  pTimer.innerHTML = sSes.innerHTML + ':00';
};


//FUNCTIONS FOR TIMER
//
const setSecs = (t, mins, secs)=>{
  if(secs > 10)
    return mins + ':' + (secs-1).toString();

  else if(secs > 0)
    return mins + ':0' + (secs-1);

  else
    return setMins(t, mins);
};

const setMins = (t, mins)=>{
  if(mins > 10)
    return (mins-1).toString() + ':59';
  
  else if(mins > 0)
    return (mins-1).toString() + ':59';
  
  else
    return end(t);
};

const end = (t)=>{
  beep.play();

  if(t === 'break'){
    h2Type.innerHTML = 'In Break';
    return (sBreak.innerHTML-1).toString() + ':59';
  }

  else{
    h2Type.innerHTML = 'In Session';
    return (sSes.innerHTML-1) + ':59';
  }

};

const run = ()=>{
  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = true;

  const intervalID = setInterval(()=>{
    if(h2Type.innerHTML === 'In Session'){
      pTimer.innerHTML = 
        setSecs('break', 
          pTimer.innerHTML.split(':')[0],
          pTimer.innerHTML.split(':')[1]);
    }
    else{
      pTimer.innerHTML = 
        setSecs('session',
          pTimer.innerHTML.split(':')[0],
          pTimer.innerHTML.split(':')[1]);
    }

    bTimer.onclick = ()=>{
      clearInterval(intervalID);
      reset();
      h2Type.innerHTML = 'In Session';

//have to set it again cuz it won't go to the bottom bTimer.onclick function :D
      bTimer.onclick = ()=>{run();};
    };
  }, 1000);
};

const reset = ()=>{
  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = false;
  pTimer.innerHTML = sSes.innerHTML + ':00';
};

//
//--end of functions for timer



//Settings
bMin.onclick = ()=>{minOrPlus('min', sBreak);};
sMin.onclick = ()=>{minOrPlus('min', sSes);};
bPlus.onclick = ()=>{minOrPlus('plus', sBreak);};
sPlus.onclick = ()=>{minOrPlus('plus', sSes);};

//Timer
bTimer.onclick = ()=>{run();};

const bMin = document.querySelector('.b--min');
const sMin = document.querySelector('.s--min');
const bPlus = document.querySelector('.b--plus');
const sPlus = document.querySelector('.s--plus');
const sSes = document.querySelector('.span--session');
const sBreak = document.querySelector('.span--break');
const pTimer = document.querySelector('.p--timer');
const bTimer = document.querySelector('.b--timer');
const h2Type = document.querySelector('.h2--type');




//FUNCTIONS FOR SETTINGS
//
const minOrPlus = (time, op)=>{
  if(op === 'min'){
    if(time.innerHTML > 1)
      time.innerHTML -= 1; 
  }
  else{
    if(time.innerHTML < 60)
      time.innerHTML = +time.innerHTML + 1; 
  }
};

const typeSettings = (op, n, pTimer)=>{
  if(n === 0){
    const time = document.querySelector('.span--break');
    minOrPlus(time, op);
  }
  else{
    const time = document.querySelector('.span--session');
    minOrPlus(time, op);
    pTimer.innerHTML = 
      time.innerHTML + ':00';
  }
};
//
//--end of functions for settings





//FUNCTIONS FOR TIMER
//
const setSecs = (t, sSes, sBreak, mins, secs, h2Type)=>{
  if(secs > 10)
    return mins + ':' + (secs-1).toString();

  else if(secs > 0)
    return mins + ':0' + (secs-1);

  else
    return setMins(t, sSes, sBreak, mins, h2Type);
};

const setMins = (t, sSes, sBreak, mins, h2Type)=>{
  if(mins > 10)
    return (mins-1).toString() + ':59';
  
  else if(mins > 0)
    return (mins-1).toString() + ':59';
  
  else
    return end(t, sSes, sBreak, h2Type);
};

const end = (t, sSes, sBreak, h2Type)=>{
  new Audio('assets/beep.mp3').play();

  if(t === 'break'){
    h2Type.innerHTML = 'In Break';
    return (sBreak.innerHTML-1).toString() + ':59';
  }

  else{
    h2Type.innerHTML = 'In Session';
    return (sSes.innerHTML-1) + ':59';
  }
};

const run = (bTimer, h2Type)=>{
  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = true;

  const intervalID = setInterval(()=>{
    if(h2Type.innerHTML === 'In Session'){
      pTimer.innerHTML = 
        setSecs('break', sSes, sBreak,
          pTimer.innerHTML.split(':')[0],
          pTimer.innerHTML.split(':')[1], h2Type);
    }
    else{
      pTimer.innerHTML = 
        setSecs('session', sSes, sBreak,
          pTimer.innerHTML.split(':')[0],
          pTimer.innerHTML.split(':')[1], h2Type);
    }

    bTimer.onclick = ()=>{
      clearInterval(intervalID);
      reset();

      //have to set it again cuz it won't go to the bottom onclick one :D
      bTimer.onclick = ()=>{run(bTimer, h2Type);};
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
bMin.onclick = ()=>{typeSettings('min', 0, pTimer);};
sMin.onclick = ()=>{typeSettings('min', 1, pTimer);};
bPlus.onclick = ()=>{typeSettings('plus', 0, pTimer);};
sPlus.onclick = ()=>{typeSettings('plus', 1, pTimer);};

//Timer
bTimer.onclick = ()=>{run(bTimer, h2Type);};

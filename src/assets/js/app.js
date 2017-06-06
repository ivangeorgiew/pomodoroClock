/* CONSTANTS */
const bMin = document.querySelector('.b--min');
const sMin = document.querySelector('.s--min');
const bPlus = document.querySelector('.b--plus');
const sPlus = document.querySelector('.s--plus');
const sSes = document.querySelector('.span--session');
const sBreak = document.querySelector('.span--break');
const h2Type = document.querySelector('.h2--type');
const bReset = document.querySelector('.b--reset');
const pTimer = document.querySelector('.p--timer');
const bTimer = document.querySelector('.b--timer');
const beep = new Audio('assets/beep.mp3');




/* Allow Notification */
if(Notification.permission !== 'granted') {
  Notification.requestPermission().then(perm => {
    if(perm === 'granted')
      console.log('Notifications will show');
  });
}




/* FUNCTION FOR SETTINGS */
const minOrPlus = (op, n)=>{
  if(op === 'min' && n.innerHTML > 0){
    if(n === sSes)
      n.innerHTML -= 5; 
    else
      n.innerHTML -= 1;
  }
  else if(op == 'plus' && n.innerHTML < 60){
    if(n === sSes)
      n.innerHTML = +n.innerHTML + 5; 
    else
      n.innerHTML = +n.innerHTML + 1;
  }

  if(n === sSes && h2Type.innerHTML === 'Session')
    pTimer.innerHTML = sSes.innerHTML + ':00';
  else if(n === sBreak && h2Type.innerHTML === 'Break')
    pTimer.innerHTML = sBreak.innerHTML + ':00';
};




/* FUNCTIONS FOR COUNTING */
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




/* FUNCTIONS FOR TIMER */
const stop = (intervalID) => {
  clearInterval(intervalID);

  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = false;
  bTimer.style.background = 'none';

  bTimer.onclick = () => {run();};
};

const change = () => {
  beep.play();

  //add notification
  if(!window.myNoti)
    window.myNoti= new Notification('Timer Ended');

  bTimer.onclick = () => {
    //remove notification
    if(myNoti) {
      setTimeout(myNoti.close.bind(myNoti), 500);
      window.myNoti = undefined;
    }

    if(h2Type.innerHTML === 'Session') {
      h2Type.innerHTML = 'Break';
      pTimer.innerHTML = sBreak.innerHTML + ':00';
    }
    else {
      h2Type.innerHTML = 'Session';
      pTimer.innerHTML = sSes.innerHTML + ':00';
    }
  };
};

const run = () => {
  //Stop from clicking too fast
  if(bTimer.style.background === 'yellow')
    return;

  bMin.disabled = sMin.disabled = bPlus.disabled = sPlus.disabled = true;
  bTimer.style.background = 'yellow';

  const intervalID = setInterval(() => {
    //Running and Stopping
    if(pTimer.innerHTML !== '0:00'){
      pTimer.innerHTML = 
        setSecs(pTimer.innerHTML.split(':')[0],
                pTimer.innerHTML.split(':')[1]);

      bTimer.onclick = () => { stop(intervalID); };
    }
    
    //Changing between Session and Break
    else change();
  }, 1000);
  
  //Reset button
  bReset.onclick = () => {
    stop(intervalID);
    pTimer.innerHTML = sSes.innerHTML + ':00';
    h2Type.innerHTML = 'Session';

    //remove notification
    if(myNoti) {
      setTimeout(myNoti.close.bind(myNoti), 500);
      window.myNoti = undefined;
    }
  };
};





/* VOLUME */
beep.volume = 1;




/* SETTINGS */
bMin.onclick = () => { minOrPlus('min', sBreak); };
sMin.onclick = () => { minOrPlus('min', sSes); };
bPlus.onclick = () => { minOrPlus('plus', sBreak); };
sPlus.onclick = () => { minOrPlus('plus', sSes); };




/* TIMER */
bTimer.onclick = () => { run(); };

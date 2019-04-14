/* CONSTANTS */
const sMin = document.querySelector('.s--min');
const sPlus = document.querySelector('.s--plus');
const sSes = document.querySelector('.span--session');
const bReset = document.querySelector('.b--reset');
const pTimer = document.querySelector('.p--timer');
const bTimer = document.querySelector('.b--timer');
const beep = new Audio('assets/beep.mp3');
let myNoti




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
    n.innerHTML -= 5; 
  }
  else if(op == 'plus' && n.innerHTML < 100){
    n.innerHTML = +n.innerHTML + 5; 
  }

  pTimer.innerHTML = sSes.innerHTML + ':00';
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
    return '00:00';
};




/* FUNCTIONS FOR TIMER */
const stop = (intervalID) => {
  clearInterval(intervalID);

  sMin.disabled = sPlus.disabled = false;
  bTimer.style.background = 'none';

  bTimer.onclick = () => {run();};
};

const change = () => {
  beep.play();

  //add notification
  if(!myNoti) {
    myNoti= new Notification('Timer Ended', { requireInteraction: false });
    myNoti.onclick = function() {
      setTimeout(myNoti.close.bind(myNoti), 500);
      myNoti = undefined

      pTimer.innerHTML = sSes.innerHTML + ':00';
    }
  }

  bTimer.onclick = () => {
    //remove notification
    if(myNoti) {
      setTimeout(myNoti.close.bind(myNoti), 500);
      myNoti = undefined;
    }

    pTimer.innerHTML = sSes.innerHTML + ':00';
  };
};

const run = () => {
  //Stop from clicking too fast
  if(bTimer.style.background === 'yellow')
    return;

  sMin.disabled = sPlus.disabled = true;
  bTimer.style.background = 'yellow';

  const intervalID = setInterval(() => {
    //Running and Stopping
    if(pTimer.innerHTML !== '00:00'){
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

    //remove notification
    if(myNoti) {
      setTimeout(myNoti.close.bind(myNoti), 500);
      myNoti = undefined;
    }
  };
};





/* VOLUME */
beep.volume = 1;




/* SETTINGS */
sMin.onclick = () => { minOrPlus('min', sSes); };
sPlus.onclick = () => { minOrPlus('plus', sSes); };




/* TIMER */
bTimer.onclick = () => { run(); };

window.addEventListener('DOMContentLoaded', () => { bTimer.click() }, false)

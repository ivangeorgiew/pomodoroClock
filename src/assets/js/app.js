const beep = new Audio('assets/beep.mp3');
//beep.play();

const minOrPlus = (time, op) => {
  if(op === 'bigger'){
    if(document.querySelector(time).innerHTML > 1){
      document.querySelector(time).innerHTML -= 1; 
    }
  }
  else{
    if(document.querySelector(time).innerHTML < 60){
      document.querySelector(time).innerHTML = 
        +document.querySelector(time).innerHTML + 1; 
    }
  }
};

const breakOrSession = (op, n) => {
  if(n === 0){
    const time = '.span--break';
    minOrPlus(time, op);
  }
  else{
    const time = '.span--session';
    minOrPlus(time, op);
    document.querySelector('.p--timer').innerHTML.split(':')[0] = +document.querySelector(time).innerHTML;
  }

};

document.querySelector('.b--min').onclick = () => {breakOrSession('bigger', 0);}
document.querySelector('.s--min').onclick = () => {breakOrSession('bigger', 1);}

document.querySelector('.b--plus').onclick = () => {breakOrSession('smaller', 0);}
document.querySelector('.s--plus').onclick = () => {breakOrSession('smaller', 1);}




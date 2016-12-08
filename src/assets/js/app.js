const minOrPlus = (op, n) => {
  if(n === 0)
    var time = '.span--break';
  else
    var time = '.span--session';

  if(op === 'bigger'){
    if(document.querySelector(time).innerHTML > 1)
      document.querySelector(time).innerHTML -= 1; 
  }
  else{
    if(document.querySelector(time).innerHTML < 60)
      document.querySelector(time).innerHTML = +document.querySelector(time).innerHTML + 1; 
  }
};

document.querySelector('.b--min').onclick = () => {minOrPlus('bigger', 0);}
document.querySelector('.s--min').onclick = () => {minOrPlus('bigger', 1);}

document.querySelector('.b--plus').onclick = () => {minOrPlus('smaller', 0);}
document.querySelector('.s--plus').onclick = () => {minOrPlus('smaller', 1);}

const audio = () {
  new Audio('http://soundbible.com/grab.php?id=1598&type=mp3').play();
};


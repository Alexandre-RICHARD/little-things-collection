let timer = 0;
let interval = 1000;

const updateTimer = () => {
  const p1 = document.querySelector(".number p:nth-child(1)")
  const p2 = document.querySelector(".number p:nth-child(2)")

  const p1v = p1.textContent;
  const p2v = p2.textContent;


  if (timer < 59) {
    timer += 1;
  } else {
    timer = 0;
  }

  if {

  }



  if (timer < 10) {
    p1.textContent = 0;
    p2.textContent = timer;
  } else {
    p1.textContent = timer.toString()[0]
    p2.textContent = timer.toString()[1]
  }
};
updateTimer();

setInterval(() => {
  updateTimer();
}, interval);
const convertToValidId = (inputString) => {
  const sanitizedString = inputString.replace(/[^a-zA-Z0-9]/g, '-');
  const loweredString = sanitizedString.toLowerCase();
  const finalId = /^[a-zA-Z]/.test(loweredString) ? loweredString : 'id-' + loweredString;
  return finalId;
}

const addTimerSection = (name, idName) => {
  const containerDiv = document.querySelector('.timers-container');
  containerDiv.insertAdjacentHTML("beforeend", `
  <div id='${idName}' class='one-timer-container'>
    <h2>${name}</h2>
    <div class='timer-parts year'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
    <div class='timer-parts month'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
    <div class='timer-parts day'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
    <div class='timer-parts hour'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
    <div class='timer-parts minute'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
    <div class='timer-parts second'>
      <p></p>
      <span></span>
      <div class='progress-bar'></div>
    </div>
  </div>
  `);
}

const createOrUpdatePartTimer = () => {

}

const updateTimer = (name, date) => {
  let startingPoint;
  let endingPoint;

  if (new Date(date) > new Date()) {
    startingPoint = new Date();
    endingPoint = new Date(date)
  } else {
    startingPoint = new Date(date)
    endingPoint = new Date();
  }

  let runYear = true;
  let runMonth = true;
  let year = 1;
  let month = 1;
  let startDate = startingPoint;

  while (runYear) {
    let newDate = new Date(startDate);
    newDate.setFullYear(startDate.getFullYear() + year)
    if (newDate >= endingPoint) {
      newDate = new Date(startDate);
      newDate.setFullYear(startDate.getFullYear() + year - 1)
      startDate = newDate;
      runYear = false;
    } else {
      year += 1;
    }
  }
  year -= 1;

  while (runMonth) {
    let newDate = new Date(startDate);
    newDate.setMonth(startDate.getMonth() + month);
    if (newDate >= endingPoint) {
      newDate = new Date(startDate);
      newDate.setMonth(startDate.getMonth() + month - 1);
      startDate = newDate;
      runMonth = false;
    } else {
      month += 1;
    }
  }
  month -= 1;

  const difference = Math.floor((endingPoint - startDate) / 1000);

  const day = Math.floor(difference / 86400);
  const hour = Math.floor((difference % 86400) / 3600);
  const minute = Math.floor(((difference % 86400) % 3600) / 60);
  const second = Math.floor(((difference % 86400) % 3600) % 60);

  const yearP = document.querySelector(`#${name} .year p`);
  const yearS = document.querySelector(`#${name} .year span`);
  const yearD = document.querySelector(`#${name} .year .progress-bar`);
  yearP.textContent = `${year}`
  yearS.textContent = ` an${year > 50 ? "s" : ""}`
  yearD.style.width = `100%`

  const yearE = document.querySelector(`#${name} .year`);
  if (year > 0) {
    yearE.classList.remove("hide");
  } else {
    yearE.classList.add("hide");
  }

  const monthP = document.querySelector(`#${name} .month p`);
  const monthS = document.querySelector(`#${name} .month span`);
  const monthD = document.querySelector(`#${name} .month .progress-bar`);
  monthP.textContent = `${month}`
  monthS.textContent = ` mois`
  monthD.style.width = `${month / 12 * 100}%`

  const monthE = document.querySelector(`#${name} .month`);
  if (month > 0 || year > 0) {
    monthE.classList.remove("hide");
  } else {
    monthE.classList.add("hide");
  }

  const dayP = document.querySelector(`#${name} .day p`);
  const dayS = document.querySelector(`#${name} .day span`);
  const dayD = document.querySelector(`#${name} .day .progress-bar`);
  dayP.textContent = `${day}`
  dayS.textContent = ` jour${day > 1 ? "s" : ""}`
  dayD.style.width = `${day / 31 * 100}%`

  const dayE = document.querySelector(`#${name} .day`);
  if (day > 0 || (month > 0 || year > 0)) {
    dayE.classList.remove("hide");
  } else {
    dayE.classList.add("hide");
  }

  const hourP = document.querySelector(`#${name} .hour p`);
  const hourS = document.querySelector(`#${name} .hour span`);
  const hourD = document.querySelector(`#${name} .hour .progress-bar`);
  hourP.textContent = `${hour}`
  hourS.textContent = ` heure${hour > 1 ? "s" : ""}`
  hourD.style.width = `${hour / 24 * 100}%`

  const hourE = document.querySelector(`#${name} .hour`);
  if (hour > 0 || (day > 0 || month > 0 || year > 0)) {
    hourE.classList.remove("hide");
  } else {
    hourE.classList.add("hide");
  }

  const minuteP = document.querySelector(`#${name} .minute p`);
  const minuteS = document.querySelector(`#${name} .minute span`);
  const minuteD = document.querySelector(`#${name} .minute .progress-bar`);
  minuteP.textContent = `${minute} `
  minuteS.textContent = ` minute${minute > 1 ? "s" : ""}`
  minuteD.style.width = `${minute / 60 * 100}%`

  const minuteE = document.querySelector(`#${name} .minute`);
  if (minute > 0 || (hour > 0 || day > 0 || month > 0 || year > 0)) {
    minuteE.classList.remove("hide");
  } else {
    minuteE.classList.add("hide");
  }

  const secondP = document.querySelector(`#${name} .second p`);
  const secondS = document.querySelector(`#${name} .second span`);
  const secondD = document.querySelector(`#${name} .second .progress-bar`);
  secondP.textContent = `${second}`;
  secondS.textContent = ` seconde${second > 1 ? "s" : ""}`;
  secondD.style.width = `${second / 60 * 100}%`
}

const handleTimer = (dateCollection) => {
  dateCollection.forEach((el) => {
    addTimerSection(el.name, convertToValidId(el.name));
    setInterval(() => {
      updateTimer(convertToValidId(el.name), el.date)
    }, 1000);
  });
}

const dateCollection = [
  {
    name: "Test",
    date: "2024-01-12T10:04:30"
  },
  {
    name: "GTA VI",
    date: "2025-03-31T24:00:00"
  },
];

handleTimer(dateCollection);
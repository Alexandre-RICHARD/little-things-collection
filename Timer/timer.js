const timerData = [
    { date: "19 Jan 2023 20:57:00", id:"x", name: "1" },
    { date: "19 Jan 2023 20:57:00", id:"y", name: "2" },
    { date: "13 Jun 2022 16:00:00", id:"z", name: "3" },
];

const box = document.querySelector(".background");
let content = "";

const transformTime = (timeMS) => {
    let time = timeMS / 1000;

    const year = Math.floor(time / 60 / 60 / 24 / 365);
    const yearC = year > 0 ? (year > 1 ? `${year} ans, ` : `${year} an, `) : "";
    time = time - year * 60 * 60 * 24 * 365;

    const month = Math.floor(time / 60 / 60 / 24 / (365 / 12));
    const monthC = month > 0 ? `${month} mois, ` : "";
    time = time - month * 60 * 60 * 24 * (365 / 12);

    const week = Math.floor(time / 60 / 60 / 24 / 7);
    const weekC = week > 0 ? (week > 1 ? `${week} semaines, ` : `${week} semaine, `) : "";
    time = time - week * 60 * 60 * 24 * 7;

    const day = Math.floor(time / 60 / 60 / 24);
    const dayC = day > 0 ? (day > 1 ? `${day} jours, ` : `${day} jour, `) : "";
    time = time - day * 60 * 60 * 24;

    const hours = Math.floor(time / 60 / 60);
    const hoursC = hours > 0 ? (hours > 1 ? `${hours} heures, ` : `${hours} heure, `) : "";
    time = time - hours * 60 * 60;

    const minutes = Math.floor(time / 60);
    const minutesC = minutes > 0 ? (minutes > 1 ? `${minutes} minutes, ` : `${minutes} minute, `) : "";
    time = time - minutes * 60;

    const second = Math.floor(time);
    const secondC = second > 0 ? (second > 1 ? `${second} secondes, ` : `${second} seconde, `) : "";

    let interval = yearC + monthC + weekC + dayC + hoursC + minutesC + secondC;
    return interval;
};

const initialTimer = async () => {
    await timerData.forEach((element) => {
        content = content.concat(`
        <div class="one-timer">
        <p class="timer-name">${element.name} : </p>
        <span id="timer-${element.id}" class="timer">WAITING</span>
        </div>
        `);
    });
    loopUpdateTime();
}

const loopUpdateTime = () => {
    updateTime()
    setInterval(() => {
        loopUpdateTime()
    }, 1000)
}

const updateTime = () => {
    timerData.forEach((element) => {
        const date = Date.now() - Date.parse(element.date);
        const interval = transformTime(date);
        document.querySelector(`#timer-${element.id}`).textContent = interval;
    });
}

initialTimer();




box.innerHTML = content;

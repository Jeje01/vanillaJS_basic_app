const clockContainer = document.querySelector(".js-clock"),
 clockTitle = clockContainer.querySelector("h1");

function getTime(){
    const date = new Date();
    const minutes = date.getMinutes();
    const hours = date.getHours();
    const seconds = date.getSeconds();
    const ap = hours>12 ? "PM" : "AM";
    /*clockTitle.innerText = `${hours<10? `0${hours}`: hours}:${
        minutes<10? `0${minutes}` : minutes
        }:${seconds<10? `0${seconds}` : seconds}`;*/
    clockTitle.innerText = `${hours%12<10? `0${hours%12}`: hours%12}:${
        minutes<10? `0${minutes}` : minutes
        }:${seconds<10? `0${seconds}` : seconds} ${ap}`;
}

function init(){
    getTime();
    setInterval(getTime, 1000);
}

init();
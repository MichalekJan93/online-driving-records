import {Calendar} from "./components/calendar.js";

const calendar = new Calendar();
let select: string[];

calendar.createCalendar();

function markingDate(): void{
    let daysInCalendar: NodeList = document.querySelectorAll('.this-month');

    daysInCalendar.forEach(selectDay => {
        selectDay.addEventListener('click', () => {
            select = calendar.selecetDayInCalendar(selectDay);
        })
    })
}

function confirmDateSelection(): void{
    const btn: HTMLButtonElement = document.querySelector('.confirm');

    btn.addEventListener('click', () => {
        console.log(select);
        calendar.deleteCalendar();
    })
}

markingDate();
confirmDateSelection();

const observer = new MutationObserver(MutationRecord =>{
    markingDate();
});

const targetNode: HTMLDivElement = document.querySelector('.days');

observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});
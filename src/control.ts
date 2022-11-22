import {Calendar} from "./components/calendar.js";

const calendar = new Calendar();
let select: string[];

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

/*const observer = new MutationObserver(MutationRecord =>{
    markingDate();
});

const targetNode: HTMLDivElement = document.querySelector('.days');

observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});*/

/*let addRecords = document.querySelectorAll('.img-add-record');

addRecords.forEach(icon => {
    icon.addEventListener('click', (event) => {
        console.log(event['layerX'], event['layerY']);
    })
})*/

/*Animace zobrazeni inputu pro pridani zaznamu*/
const showControls = document.querySelector('.show-records');
const filters = document.querySelectorAll('.filters');

showControls.addEventListener('click', () => {
    const addRecord = document.querySelector('.add-record');
    // @ts-ignore
    addRecord.style.display = 'block';

    function interval(){
        filters.forEach(filter => {
            // @ts-ignore
            filter.style.display = 'flex';
        })
    }

    const myTemiout = setTimeout(interval, 300);
})

/*Zobrazeni kalendare*/
const addButtonCalendar = document.querySelectorAll('.img-calendar');

addButtonCalendar.forEach(button => {
    button.addEventListener('click', () => {
        const location: Element= button.parentElement.lastElementChild;

        calendar.createCalendar(location);

        markingDate();
        confirmDateSelection();
    })
})


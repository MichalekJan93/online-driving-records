import { Calendar } from "./components/Calendar.ts";
import { AddRecords } from "./components/AddRecords.ts";
const calendar = new Calendar();
let select;
function markingDate() {
    let daysInCalendar = document.querySelectorAll('.this-month');
    daysInCalendar.forEach(selectDay => {
        selectDay.addEventListener('click', () => {
            select = calendar.selecetDayInCalendar(selectDay);
        });
    });
}
function confirmDateSelection() {
    const btn = document.querySelector('.confirm');
    btn.addEventListener('click', () => {
        console.log(select);
        calendar.deleteCalendar();
    });
}
function mutationObs(observer, target) {
    console.log('target: ' + target);
    const targetNode = document.querySelector(`${target}`);
    console.log('node: ' + targetNode);
    observer.observe(targetNode, {
        childList: true,
        subtree: true,
        characterDataOldValue: true
    });
}
/*Test vlozeni form pro pridani*/
const content = document.querySelector('.content');
const addRecord = new AddRecords();
addRecord.showRecords(content);
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
    function interval() {
        filters.forEach(filter => {
            // @ts-ignore
            filter.style.display = 'flex';
        });
    }
    const myTemiout = setTimeout(interval, 300);
});
/*Zobrazeni kalendare*/
const addButtonCalendar = document.querySelectorAll('.img-calendar');
addButtonCalendar.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.parentElement.lastElementChild;
        calendar.createCalendar(location);
        markingDate();
        confirmDateSelection();
        const observer = new MutationObserver(MutationRecord => {
            markingDate();
        });
        mutationObs(observer, '.days');
    });
});
/*Zobrazeni vyberu*/
const addButtonArrow = document.querySelectorAll('.img-arrow');
addButtonArrow.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.parentElement.lastElementChild;
        // @ts-ignore
        location.style.display = 'block';
        const observer = new MutationObserver(MutationRecord => {
            markingDate();
        });
        mutationObs(observer, '.filters');
    });
});

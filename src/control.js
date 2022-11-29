import { Calendar } from "./components/Calendar.js";
import { AddRecords } from "./components/AddRecords.js";
import { DrivingRecords } from "./components/DrivingRecords.js";
import { Message } from "./components/Message.js";
const calendar = new Calendar();
let message = new Message();
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
        calendar.deleteCalendar();
    });
}
function mutationObs(observer, target) {
    const targetNode = document.querySelector(`${target}`);
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
const addDrivingRecords = new DrivingRecords();
addDrivingRecords.showDrivingRecords(content);
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
/**
 * Odstraneni zaznamu
 */
const observer = new MutationObserver(MutationRecord => {
    const deleteRecordButtons = document.querySelectorAll('.delete-this-record');
    deleteRecordButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const messageDialog = message.showDialog('Are you sure you want to delete the record?');
            const confirmButton = document.querySelector('.confirm-message');
            const cancelButton = document.querySelector('.cancel-message');
            confirmButton.addEventListener('click', () => {
                message.deleteDialog(messageDialog);
                const location = document.querySelector('.records');
                addDrivingRecords.deleteRecord(btn['id'], location);
            });
            cancelButton.addEventListener('click', () => {
                message.deleteDialog(messageDialog);
            });
        });
    });
});
mutationObs(observer, '.content');

import {AddRecords} from "./components/AddRecords.js";
import {DrivingRecords} from "./components/DrivingRecords.js";
import {Message} from "./components/Message.js";
import {mutationObs} from "./controls/Mutation.js";
import {InputDriver} from "./controls/InputDriver.js";

let message = new Message();

/*Test vlozeni form pro pridani*/

const content: Element = document.querySelector('.content');

const addRecord = new AddRecords();
addRecord.showRecords(content);

const addDrivingRecords = new DrivingRecords();

addDrivingRecords.showDrivingRecords(content);

/*Animace zobrazeni inputu pro pridani zaznamu*/
const showControl: HTMLImageElement= document.querySelector('.show-records');
const filters: NodeList = document.querySelectorAll('.filters');

showControl.addEventListener('click', () => {
    const addRecord: HTMLDivElement = document.querySelector('.add-record');

    addRecord.style.display = 'block';
    showControl.style.transform = 'rotate(270deg)'

    function interval(){
        filters.forEach(filter => {
            // @ts-ignore
            filter.style.display = 'flex';
        })
    }

    const myTemiout = setTimeout(interval, 300);
})

/*Zobrazeni vyberu*/
/*Ovladani arrow input*/
const addButtonArrow: NodeList = document.querySelectorAll('.img-arrow');
const inputDriver = new InputDriver();
addButtonArrow.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.parentElement.lastElementChild as HTMLDivElement;
        addRecord.showDiv(location);
        inputDriver.showingRecords(location);

        const observer = new MutationObserver(MutationRecord =>{
            /*markingDate();*/
        });

        mutationObs(observer,'.filters');

    })
})

const observer = new MutationObserver(MutationRecord =>{
    const deleteRecordButtons: NodeList = document.querySelectorAll('.delete-this-record');
    deleteRecordButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {

            const messageDialog: HTMLDialogElement = message.showDialog('Are you sure you want to delete the record?');
            const confirmButton: HTMLButtonElement = document.querySelector('.confirm-message');
            const cancelButton: HTMLButtonElement = document.querySelector('.cancel-message');

            confirmButton.addEventListener('click', () => {
                message.deleteDialog(messageDialog);
                const location = document.querySelector('.records');
                addDrivingRecords.deleteRecord(btn['id'], location)
            })
            cancelButton.addEventListener('click', () => {
                message.deleteDialog(messageDialog);
            })
        })
    })
});

mutationObs(observer,'.content');



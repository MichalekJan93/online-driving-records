import {Calendar} from "../components/Calendar.js";
import {mutationObs} from "./Mutation.js";

const calendar = new Calendar();
let select: string[];

function markingDate(): void{
    let daysInCalendar: NodeList = document.querySelectorAll('.this-month');

    daysInCalendar.forEach(selectDay => {
        selectDay.addEventListener('click', () => {
            select = calendar.selectDayInCalendar(selectDay);
        })
    })
}

function inputSelectedDate(date: string[], location: Node): void {

    if(parseInt(date[2]) < 10){
        date[2] = '0' + date[2];
    }

    const month: number = parseInt(date[0]) + 1;
    if(month < 10){
        date[0] = '0' + month.toString();
    }

    const selectedDate = `${date[1]}-${date[0]}-${date[2]}`;
    // @ts-ignore
    location.value = selectedDate;
}

function confirmDateSelection(location: Node): void{
    const btn: HTMLButtonElement = document.querySelector('.confirm');

    btn.addEventListener('click', () => {
        calendar.deleteCalendar();
        inputSelectedDate(select, location)
    })
}

/*Zobrazeni kalendare*/
const addButtonCalendar = document.querySelectorAll('.img-calendar');

addButtonCalendar.forEach(button => {
    button.addEventListener('click', () => {
        const location: Element= button.parentElement.lastElementChild;
        const inputLocation: Node = button.parentElement.children[1];
        calendar.createCalendar(location);

        markingDate();
        confirmDateSelection(inputLocation);

        const observer = new MutationObserver(MutationRecord =>{
            markingDate();
        });

        mutationObs(observer,'.days');

    })
})
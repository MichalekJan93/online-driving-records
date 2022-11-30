import { Calendar } from "../components/Calendar.js";
import { mutationObs } from "./Mutation.js";
const calendar = new Calendar();
let select;
function markingDate() {
    let daysInCalendar = document.querySelectorAll('.this-month');
    daysInCalendar.forEach(selectDay => {
        selectDay.addEventListener('click', () => {
            select = calendar.selectDayInCalendar(selectDay);
        });
    });
}
function inputSelectedDate(date, location) {
    const newMonth = parseInt(date[0]) + 1;
    if (parseInt(date[2]) < 10) {
        date[2] = '0' + date[2];
    }
    if (newMonth < 10) {
        date[0] = '0' + newMonth.toString();
    }
    const selectedDate = `${date[1]}-${date[0]}-${date[2]}`;
    // @ts-ignore
    location.value = selectedDate;
}
function confirmDateSelection(location) {
    const btn = document.querySelector('.confirm');
    btn.addEventListener('click', () => {
        calendar.deleteCalendar();
        inputSelectedDate(select, location);
    });
}
/*Zobrazeni kalendare*/
const addButtonCalendar = document.querySelectorAll('.img-calendar');
addButtonCalendar.forEach(button => {
    button.addEventListener('click', () => {
        const location = button.parentElement.lastElementChild;
        const inputLocation = button.parentElement.children[1];
        calendar.createCalendar(location);
        markingDate();
        confirmDateSelection(inputLocation);
        const observer = new MutationObserver(MutationRecord => {
            markingDate();
        });
        mutationObs(observer, '.days');
    });
});

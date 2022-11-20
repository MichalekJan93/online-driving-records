import { Calendar } from "./components/calendar.js";
const calendar = new Calendar();
let select;
calendar.createCalendar();
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
markingDate();
confirmDateSelection();
const observer = new MutationObserver(MutationRecord => {
    markingDate();
});
const targetNode = document.querySelector('.days');
observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

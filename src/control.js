import { Calendar } from "./components/calendar.js";
const calendar = new Calendar();
calendar.createCalendar();
/*Control calendar*/
let dateArray;
let daysInCalendar = document.querySelectorAll('.this-month');
daysInCalendar.forEach(oneDay => {
    oneDay.addEventListener('click', () => {
        dateArray = [];
        let acutalyMonthAndYear = calendar.actuallyMonthWithYear();
        let sArray = acutalyMonthAndYear.split(" ");
        for (let i = 0; i < sArray.length; i++) {
            dateArray.push(sArray[i]);
        }
        let day = oneDay['id'].substring(3, oneDay['id'].length);
        dateArray.push(day);
        console.log(dateArray);
    });
});
const observer = new MutationObserver(MutationRecord => {
    let daysInCalendar = document.querySelectorAll('.this-month');
    daysInCalendar.forEach(oneDay => {
        oneDay.addEventListener('click', () => {
            dateArray = [];
            let acutalyMonthAndYear = calendar.actuallyMonthWithYear();
            let sArray = acutalyMonthAndYear.split(" ");
            for (let i = 0; i < sArray.length; i++) {
                dateArray.push(sArray[i]);
            }
            let day = oneDay['id'].substring(3, oneDay['id'].length);
            dateArray.push(day);
            console.log(dateArray);
        });
    });
});
const targetNode = document.querySelector('.days');
observer.observe(targetNode, {
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

export class Calendar {
    constructor() {
        // Month Names to display the name of the month in the calendar
        this._monthNames = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
        ];
        // Days of the week displayed on the calendar
        this._nameOfDay = [
            'Mo',
            'Tu',
            'We',
            'Th',
            'Fr',
            'Sa',
            'Su'
        ];
        this._date = new Date();
        // The selected month that is displayed in the calendar
        this._currentMonth = this._date.getMonth();
        // The selected year that is displayed in the calendar
        this._currentYear = this._date.getFullYear();
        /**
         * Method for create Calendar with its DOM elements
         * @param {Element} location The element in which we insert the calendar
         * @private
         */
        this._createCalendar = (location) => {
            this.deleteCalendar();
            const divCalendar = document.createElement('div');
            const divDate = document.createElement('div');
            const divWeekend = document.createElement('div');
            const divDays = document.createElement('div');
            const divConfirmation = document.createElement('div');
            const buttonLeft = document.createElement('button');
            const buttonRight = document.createElement('button');
            const buttonCancel = document.createElement('button');
            const buttonConfirm = document.createElement('button');
            const imgButtonLeft = document.createElement('img');
            const imgButtonRight = document.createElement('img');
            const paragraphYearWithMonths = document.createElement('p');
            divCalendar.setAttribute('class', 'calendar');
            divDate.setAttribute('class', 'date');
            divWeekend.setAttribute('class', 'weekend');
            divDays.setAttribute('class', 'days');
            divConfirmation.setAttribute('class', 'confirmation');
            buttonLeft.setAttribute('class', 'btn-control');
            buttonLeft.setAttribute('id', 'left');
            buttonRight.setAttribute('class', 'btn-control');
            buttonRight.setAttribute('id', 'right');
            imgButtonLeft.setAttribute('src', 'img/arrow.png');
            imgButtonLeft.setAttribute('alt', 'Company car application');
            imgButtonRight.setAttribute('src', 'img/arrow.png');
            imgButtonRight.setAttribute('alt', 'Company car application');
            buttonCancel.setAttribute('class', 'btn cancel');
            buttonConfirm.setAttribute('class', 'btn confirm');
            paragraphYearWithMonths.setAttribute('class', 'year-with-months');
            buttonCancel.innerText = 'Cancel';
            buttonConfirm.innerText = 'Done';
            location.appendChild(divCalendar);
            divCalendar.appendChild(divDate);
            divDate.appendChild(buttonLeft);
            divDate.appendChild(paragraphYearWithMonths);
            divDate.appendChild(buttonRight);
            buttonLeft.appendChild(imgButtonLeft);
            buttonRight.appendChild(imgButtonRight);
            divCalendar.appendChild(divWeekend);
            divCalendar.appendChild(divDays);
            divCalendar.appendChild(divConfirmation);
            divConfirmation.appendChild(buttonCancel);
            divConfirmation.appendChild(buttonConfirm);
            for (let i = 0; i < this._nameOfDay.length; i++) {
                const paragraphNameOfDay = document.createElement('p');
                paragraphNameOfDay.innerText = this._nameOfDay[i];
                divWeekend.appendChild(paragraphNameOfDay);
            }
        };
        /**
         * The method for finding the number of days in a month
         * @returns {number} Number of days in a month
         * @private
         */
        this._lastDateOfMonth = () => {
            return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
        };
        /**
         * Method for finding the first day of the month
         * @returns {number} First day of the month
         * @private
         */
        this._firstDayOfMonth = () => {
            const firstDay = new Date(this._currentYear, this._currentMonth, 1).getDay();
            // If we get 0 in firstDay as the index of the day in week 0, then we store 7 in firstDay, because the week starts on Monday and ends on Sunday
            if (firstDay === 0) {
                return 7;
            }
            else {
                return firstDay;
            }
        };
        /**
         * Method for finding the last day of the month
         * @returns {number} last day of the month
         * @private
         */
        this._lastDayOfMonth = () => {
            return new Date(this._currentYear, this._currentMonth, this._lastDateOfMonth()).getDay() + 1;
        };
        /**
         * A method to find the last day in the previous month
         * @returns {number} Last day of the last month
         * @private
         */
        this._lastDateOfLastMonth = () => {
            return new Date(this._currentYear, this._currentMonth, 0).getDate();
        };
        /**
         * A method to insert the month and year into the calendar header
         * @private
         */
        this._yearInCalendar = () => {
            let yearWithMonth = document.querySelector('.year-with-months');
            yearWithMonth.innerHTML = '';
            yearWithMonth.innerHTML = `${this._monthNames[this._currentMonth]} ${this._currentYear}`;
        };
        /**
         * A method to insert days into a calendar
         * @private
         */
        this._daysInCalendar = () => {
            const daysDiv = document.querySelector('.days');
            daysDiv.innerHTML = '';
            // A cycle for inserting days from the previous month into the calendar
            for (let i = this._firstDayOfMonth(); i > 1; i--) {
                let numberOfDayParagraph = document.createElement('p');
                numberOfDayParagraph.setAttribute('class', `last-month day${i}`);
                numberOfDayParagraph.innerHTML = String(this._lastDateOfLastMonth() - i + 2);
                daysDiv.appendChild(numberOfDayParagraph);
            }
            // Cycle for inserting days from the selected month into the calendar
            for (let i = 1; i <= this._lastDateOfMonth(); i++) {
                let isToday = i === this._date.getDate() && this._currentMonth === new Date().getMonth()
                    && this._currentYear === new Date().getFullYear() ? 'this-month today' : 'this-month';
                let numberOfDayParagraph = document.createElement('p');
                numberOfDayParagraph.setAttribute('class', `${isToday}`);
                numberOfDayParagraph.setAttribute('id', `day${i}`);
                numberOfDayParagraph.innerHTML = String(i);
                daysDiv.appendChild(numberOfDayParagraph);
            }
            // Cycle for inserting days from the next month into the calendar
            for (let i = this._lastDayOfMonth(); i <= 7 && i != 1; i++) {
                let numberOfDayParagraph = document.createElement('p');
                numberOfDayParagraph.setAttribute('class', `last-day day${i - this._lastDateOfLastMonth() + 1}`);
                numberOfDayParagraph.innerHTML = String(i - this._lastDayOfMonth() + 1);
                daysDiv.appendChild(numberOfDayParagraph);
            }
        };
        /**
         * A method to control the calendar
         * @private
         */
        this._controlCalendar = () => {
            let controlBtn = document.querySelectorAll('.btn-control');
            controlBtn.forEach(btn => {
                btn.addEventListener('click', () => {
                    this._currentMonth = btn['id'] === 'left' ? this._currentMonth - 1 : this._currentMonth + 1;
                    if (this._currentMonth === 12) {
                        this._currentMonth = 0;
                        this._currentYear += 1;
                    }
                    if (this._currentMonth === -1) {
                        this._currentMonth = 11;
                        this._currentYear -= 1;
                    }
                    this._yearInCalendar();
                    this._daysInCalendar();
                });
            });
        };
        /**
         * The method styles the date selected by the user
         * @param selectedDay Selected date
         * @returns {string[]} The complete date selected by the user
         */
        this.selectDayInCalendar = (selectedDay) => {
            let daysInCalendar = document.querySelectorAll('.this-month');
            let _selectDay = [];
            let actuallyMonthAndYear = `${this._currentMonth} ${this._currentYear}`;
            let newArray = actuallyMonthAndYear.split(" ");
            for (let i = 0; i < newArray.length; i++) {
                _selectDay.push(newArray[i]);
            }
            daysInCalendar.forEach(day => {
                // @ts-ignore
                if (day.className != 'this-month today') {
                    // @ts-ignore
                    day.setAttribute('class', 'this-month');
                }
            });
            let day = selectedDay['id'].substring(3, selectedDay['id'].length);
            _selectDay.push(day);
            // @ts-ignore
            selectedDay.classList.add('selected-day');
            return _selectDay;
        };
        /**
         * A method to capture clicks on the cancel button
         * Method calls the deleteCalendar() method, which deletes the calendar
         * @private
         */
        this._cancelCalendar = () => {
            const btn = document.querySelector('.cancel');
            btn.addEventListener('click', () => {
                this.deleteCalendar();
            });
        };
        /**
         * The method deletes the calendar
         */
        this.deleteCalendar = () => {
            const _calendar = document.querySelector('.calendar');
            if (_calendar != undefined) {
                _calendar.remove();
            }
        };
        /**
         * The method starts the necessary methods to display and control the calendar
         */
        this.createCalendar = (localiton) => {
            this._createCalendar(localiton);
            this._yearInCalendar();
            this._daysInCalendar();
            this._controlCalendar();
            this._cancelCalendar();
        };
    }
}

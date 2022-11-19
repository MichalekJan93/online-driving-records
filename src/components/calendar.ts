export class Calendar {

    private _monthNames: string[] = [
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
    private _nameOfDay = [
        'Mo',
        'Tu',
        'We',
        'Th',
        'Fr',
        'Sa',
        'Su'
    ]

    private _date: Date = new Date();
    private _currentMonth: number = this._date.getMonth();
    private _currentYear: number = this._date.getFullYear();

    private _createCalendar = (): void => {
        const divCalendar:HTMLDivElement  = document.createElement('div');
        const divDate:HTMLDivElement  = document.createElement('div');
        const divWeekend:HTMLDivElement  = document.createElement('div');
        const divDays:HTMLDivElement  = document.createElement('div');
        const divConfirmation:HTMLDivElement  = document.createElement('div');

        const buttonLeft: HTMLButtonElement = document.createElement('button');
        const buttonRight: HTMLButtonElement = document.createElement('button');
        const buttonCancel: HTMLButtonElement = document.createElement('button');
        const buttonConfirm: HTMLButtonElement = document.createElement('button');

        const imgButtonLeft: HTMLImageElement = document.createElement('img');
        const imgButtonRight: HTMLImageElement = document.createElement('img');

        const paragraphYearWithMonths: HTMLParagraphElement = document.createElement('p');

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
        paragraphYearWithMonths.setAttribute('class', 'year-with-months')

        buttonCancel.innerText = 'Cancel';
        buttonConfirm.innerText = 'Done';

        document.body.appendChild(divCalendar);
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

        for(let i = 0; i < this._nameOfDay.length; i++){
            const paragraphNameofDay: HTMLParagraphElement = document.createElement('p');
            paragraphNameofDay.innerText = this._nameOfDay[i];
            divWeekend.appendChild(paragraphNameofDay);
        }
    }


    /**
     * The method for finding the number of days in a month
     * @returns {number} Number of days in a month
     */
    private _lastDateOfMonth = (): number => {
        return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
    }

    private _firstDayOfMonth = (): number => {
        return new Date(this._currentYear, this._currentMonth,1).getDay();
    }

    private _lastDateOfLastMonth = (): number => {
        return new Date(this._currentYear, this._currentMonth,0).getDate();
    }

    private _yearInCalendar = (): void => {
        let yearWithMonth: HTMLDivElement = document.querySelector('.year-with-months');
        yearWithMonth.innerHTML = '';
        yearWithMonth.innerHTML = `${this._monthNames[this._currentMonth]} ${this._currentYear}`
    }

    private _daysInCalendar = (): void => {
        const daysDiv: HTMLDivElement = document.querySelector('.days');
        daysDiv.innerHTML = '';

        for(let i = this._firstDayOfMonth(); i > 1; i--){
            let numberOfDayParagraph: HTMLElement = document.createElement('p');
            numberOfDayParagraph.setAttribute('class', `last-month day${i}`)
            numberOfDayParagraph.innerHTML = String(this._lastDateOfLastMonth() - i + 2);
            daysDiv.appendChild(numberOfDayParagraph);
        }

        for(let i = 1; i <= this._lastDateOfMonth(); i++){
            let isToday: string = i === this._date.getDate() && this._currentMonth === new Date().getMonth()
                        && this._currentYear === new Date().getFullYear() ? 'this-month today' : 'this-month';
            let numberOfDayParagraph: HTMLElement = document.createElement('p');
            numberOfDayParagraph.setAttribute('class', `${isToday}`)
            numberOfDayParagraph.setAttribute('id', `day${i}`)
            numberOfDayParagraph.innerHTML = String(i);

            daysDiv.appendChild(numberOfDayParagraph);
        }
    }

    private _controlCalendar = (): void => {
        let controlBtn: NodeList = document.querySelectorAll('.btn-control');
        controlBtn.forEach(btn =>{
            btn.addEventListener('click', () => {
                this._currentMonth = btn['id'] === 'left' ? this._currentMonth - 1 : this._currentMonth + 1;

                if(this._currentMonth === 12){
                    this._currentMonth = 0;
                    this._currentYear += 1
                }

                if(this._currentMonth === -1){
                    this._currentMonth = 11;
                    this._currentYear -= 1
                }

                this._yearInCalendar();
                this._daysInCalendar();
            })
        })
    }

    actuallyMonthWithYear = (): string => {
            return `${this._currentMonth} ${this._currentYear}`;
    }

    createCalendar = () => {
        this._createCalendar();
        this._yearInCalendar();
        this._daysInCalendar();
        this._controlCalendar();
    }
}
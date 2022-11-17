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
    ]
    private _date: Date = new Date();
    private _currentMonth: number = this._date.getMonth();
    private _currentYear: number = this._date.getFullYear();
    /**
     * The method detects if the year is a leap year
     * @param year {number} The year for which we want to find out if it is a leap year
     * @returns {boolean} Returns true if the year is a leap year, otherwise false
     * @private
     */
    private _isLeapYear(year: number): boolean{
        return(
            (year % 4 === 0 && year % 100 != 0 && year % 400 != 0) ||
            (year % 100 === 0 && year % 400 === 0)
        );
    }

    /**
     * The method for finding how many days are in February.
     * @param year {number} The year in which we find out how many days February has
     * @returns {number} Number of days in February
     * @private
     */
    private _getFebDays = (year: number): number => {
        return this._isLeapYear(year) ? 29 : 28;
    }

    /**
     * The method for finding the number of days in a month
     * @returns {number} Number of days in a month
     */
    private _lastDateOfMonth = (): number => {
        return new Date(this._currentYear, this._currentMonth + 1, 0).getDate();
    }

    private _yearInCalendar = (): void => {
        let yearWithMonth: HTMLDivElement = document.querySelector('.year-with-months');
        yearWithMonth.innerHTML = '';
        yearWithMonth.innerHTML = `${this._monthNames[this._currentMonth]} ${this._currentYear}`
    }

    private _daysInCalendar = (): void => {
        const daysDiv: HTMLDivElement = document.querySelector('.days');
        daysDiv.innerHTML = '';
        const numbersOfDaysInMonth: number = this._lastDateOfMonth();
        for (let i = 0; i < numbersOfDaysInMonth; i++) {
            let numberOfDayParagraph: HTMLElement = document.createElement('p');
            numberOfDayParagraph.setAttribute('class', `day${i}`)
            numberOfDayParagraph.innerHTML = String(i + 1);

            daysDiv.appendChild(numberOfDayParagraph);
        }
    }

    private _controlCalendar = (): void => {
        let controlBtn = document.querySelectorAll('.btn-control');

        controlBtn.forEach(btn =>{

            btn.addEventListener('click', () => {
                this._currentMonth = btn.id === 'left' ? this._currentMonth - 1 : this._currentMonth + 1;

                if(this._currentMonth === 12){
                    this._currentMonth = 0;
                    this._currentYear += 1
                }

                if(this._currentMonth === -1){
                    this._currentMonth = 11;
                    this._currentYear -= 1
                }

                console.log(this._currentMonth + '----' + this._currentYear);
                this._yearInCalendar();
                this._daysInCalendar();
            })
        })
    }

    createCalendar = () => {
        this._yearInCalendar();
        this._daysInCalendar();
        this._controlCalendar();
    }
}
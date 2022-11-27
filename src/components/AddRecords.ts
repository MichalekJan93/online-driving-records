/**
 * A class for creating a form for inserting a new driving record
 */
export class AddRecords {

    // Array with label names
    private _labelNames: string[] = [
        'Driver',
        'Car',
        'Start of the ride',
        'End of the ride',
    ]

    // Array wait input ID's
    private _inputID: string[]  = [
        'input-driver',
        'input-car',
        'input-from',
        'input-to',
    ]

    /**
     * Method to create control-records with its complete DOM
     * @param {Element} location The element in which we insert the record
     * @private
     */
    private _createDOM (location: Element):void {
        const controlRecordsDiv: HTMLDivElement = document.createElement('div');
        const showRecordsImg: HTMLImageElement = document.createElement('img');
        const addRecordDiv: HTMLDivElement = document.createElement('div');

        controlRecordsDiv.setAttribute('class', 'control-records');
        showRecordsImg.setAttribute('class', 'show-records');
        showRecordsImg.setAttribute('src', './img/arrow.png');
        showRecordsImg.setAttribute('alt', 'Company car')
        addRecordDiv.setAttribute('class', 'add-record')

        location.appendChild(controlRecordsDiv);
        controlRecordsDiv.appendChild(showRecordsImg);
        location.appendChild(addRecordDiv);

        // We use the index to find out if we are creating inputs for the first or second div filters
        let index: number = 0;

        // Loop to create divs filter
        for(let i = 0; i < 2; i++){
            const inputFiltersDiv: HTMLDivElement = document.createElement('div');
            inputFiltersDiv.setAttribute('class', 'filters');
            addRecordDiv.appendChild(inputFiltersDiv);

            // Loop to create divs input-filter
            for(let k = 0; k < 2; k++){
                const inputFilterDiv: HTMLDivElement = document.createElement('div');
                const label: HTMLLabelElement = document.createElement('label');
                const inputText: HTMLInputElement = document.createElement('input');
                const imgArrow: HTMLImageElement = document.createElement('img');
                const inputDriverDriversDiv: HTMLDivElement = document.createElement('div');

                inputFilterDiv.setAttribute('class', 'input-filter');
                label.setAttribute('for', this._inputID[index]);
                label.setAttribute('disabled', '');
                inputText.setAttribute('id', this._inputID[index]);
                inputText.setAttribute('disabled', '');

                if(index > 1) {
                    inputText.setAttribute('type', 'date');
                    imgArrow.setAttribute('alt', 'Company car');
                    imgArrow.setAttribute('src', './img/date.png');
                    inputDriverDriversDiv.setAttribute('class', 'input-calendar');
                    imgArrow.setAttribute('class', 'img-add-record img-calendar');
                } else {
                    inputText.setAttribute('type', 'text');
                    imgArrow.setAttribute('alt', 'Company car');
                    imgArrow.setAttribute('src', './img/arrow.png');
                    inputDriverDriversDiv.setAttribute('class', 'input-driver-drivers');
                    imgArrow.setAttribute('class', 'img-add-record img-arrow');
                }

                label.innerText = this._labelNames[index];

                inputFiltersDiv.appendChild(inputFilterDiv);
                inputFilterDiv.appendChild(label);
                inputFilterDiv.appendChild(inputText);
                inputFilterDiv.appendChild(imgArrow);
                inputFilterDiv.appendChild(inputDriverDriversDiv);

                if(index === 3){
                    const addBtn: HTMLButtonElement = document.createElement('button');
                    addBtn.setAttribute('class', 'add-record-button');

                    addBtn.innerText = 'Přidat záznam';

                    inputFiltersDiv.appendChild(addBtn);
                }

                index ++;
            }
        }

    }

    /**
     * Method for show filters
     * @param {Element} location The element in which we insert the record
     */
    showRecords(location: Element): void{
        this._createDOM(location);
    }
}
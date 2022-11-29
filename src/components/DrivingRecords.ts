import {Data} from "../dtb/data.js";

/**
 * Class for creating a driving record
 * Class for removing a driving record
 */
export class DrivingRecords {

    /**
     * Method for create Record with its DOM elements
     * @param {Element} location The element in which we insert the record
     * @private
     */
    private _createDOMRecordFilter(location: Element): void{
        const recordFiltersDiv: HTMLDivElement = document.createElement('div');
        const driverFilterDiv: HTMLDivElement = document.createElement('div');
        const carFilterDiv: HTMLDivElement = document.createElement('div');
        const registrationNumberFilter: HTMLDivElement = document.createElement('div');
        const startDriveFilterDiv: HTMLDivElement = document.createElement('div');
        const endDriverFilterDiv: HTMLDivElement = document.createElement('div');
        const recordsDiv: HTMLDivElement = document.createElement('div');

        const paragraphDriver: HTMLParagraphElement = document.createElement('p');
        const paragraphCar: HTMLParagraphElement = document.createElement('p');
        const paragraphRegistrationNumber: HTMLParagraphElement = document.createElement('p');
        const paragraphStartDrive: HTMLParagraphElement = document.createElement('p');
        const paragraphEndDrive: HTMLParagraphElement = document.createElement('p');

        paragraphDriver.innerText = 'Driver';
        paragraphCar.innerText = 'Car';
        paragraphRegistrationNumber.innerText = 'Plates';
        paragraphStartDrive.innerText = 'Start of the ride';
        paragraphEndDrive.innerText = 'End of the ride';

        recordFiltersDiv.setAttribute('class', 'record-filters');
        driverFilterDiv.setAttribute('class', 'driver-filter');
        carFilterDiv.setAttribute('class', 'car-filter');
        registrationNumberFilter.setAttribute('class', 'start-drive-filter');
        startDriveFilterDiv.setAttribute('class', 'start-drive-filter');
        endDriverFilterDiv.setAttribute('class', 'end-drive-filter');
        recordsDiv.setAttribute('class', 'records');

        location.appendChild(recordFiltersDiv);
        recordFiltersDiv.appendChild(driverFilterDiv);
        driverFilterDiv.appendChild(paragraphDriver);
        recordFiltersDiv.appendChild(carFilterDiv);
        carFilterDiv.appendChild(paragraphCar);
        recordFiltersDiv.appendChild(registrationNumberFilter);
        registrationNumberFilter.appendChild(paragraphRegistrationNumber);
        recordFiltersDiv.appendChild(startDriveFilterDiv);
        startDriveFilterDiv.appendChild(paragraphStartDrive);
        recordFiltersDiv.appendChild(endDriverFilterDiv);
        endDriverFilterDiv.appendChild(paragraphEndDrive);
        location.appendChild(recordsDiv);
    }

    /**
     * A method for creating an individual driving record
     * @param {Element} location The element in which we insert the record
     * @param {String} driver Name of the driver
     * @param {String} car Car name
     * @param {String} registrationNumber Car license plate
     * @param {String} startDrive Start of the ride
     * @param {String} endDrive End of the ride
     * @private
     */
    private _createDOMRecord(location: Element, id: string, driver: string, car: string, registrationNumber: string, startDrive: string, endDrive: string): void{
        const recordDiv: HTMLDivElement = document.createElement('div');
        const driverDiv: HTMLDivElement = document.createElement('div');
        const carDiv: HTMLDivElement = document.createElement('div');
        const registrationNumberDiv: HTMLDivElement = document.createElement('div');
        const startDriveDiv: HTMLDivElement = document.createElement('div');
        const endDriveDiv: HTMLDivElement = document.createElement('div');
        const deleteRecordDiv: HTMLDivElement = document.createElement('div');
        const deleteRecordSpan: HTMLSpanElement = document.createElement('span');
        const deleteRecordImg: HTMLImageElement = document.createElement('img');

        recordDiv.setAttribute('class', `record`);
        driverDiv.setAttribute('class', 'driver');
        carDiv.setAttribute('class', 'car');
        registrationNumberDiv.setAttribute('class', 'registration-number');
        startDriveDiv.setAttribute('class', 'start-drive');
        endDriveDiv.setAttribute('class', 'end-drive');
        deleteRecordDiv.setAttribute('class', 'delete-record');
        deleteRecordSpan.setAttribute('class', 'delete-this-record');
        deleteRecordSpan.setAttribute('id', `${id}`);
        deleteRecordImg.setAttribute('src', './img/cross.png');
        deleteRecordImg.setAttribute('alt', 'Company car');

        driverDiv.innerText = driver;
        carDiv.innerText = car;
        registrationNumberDiv.innerText = registrationNumber;
        startDriveDiv.innerText = startDrive;
        endDriveDiv.innerText = endDrive;

        location.appendChild(recordDiv);
        recordDiv.appendChild(driverDiv);
        recordDiv.appendChild(carDiv);
        recordDiv.appendChild(registrationNumberDiv);
        recordDiv.appendChild(startDriveDiv);
        recordDiv.appendChild(endDriveDiv);
        recordDiv.appendChild(deleteRecordDiv)
        deleteRecordDiv.appendChild(deleteRecordSpan);
        deleteRecordSpan.appendChild(deleteRecordImg);
    }

    /**
     * A method for working with promises
     * @param {Element} location The element in which we insert the record
     * @param {Promise} dataFromDtb Data from database
     * @private
     */
    private _createRecord(location: Element, dataFromDtb: Promise<[]>){
        let data: Promise<void | []> = dataFromDtb.then(result =>
            result.forEach(data => {
                // Editing the string so that we write to page only the date, without the time
                let _newDateStartDrive: string = data['startDrive'];
                _newDateStartDrive = _newDateStartDrive.substring(0, 10);
                // Editing the string so that we write to page only the date, without the time
                let _newDateEndDrive: string = data['startDrive'];
                _newDateEndDrive = _newDateEndDrive.substring(0, 10);

                this._createDOMRecord(location, data['_id'], data['driver'], data['car'], data['SPZ'], _newDateStartDrive, _newDateEndDrive)
            })
        )
    }

    /**
     * Method for get data from database
     * @private
     */
    private async _dataFromDtb(){
        const _getData = new Data();
        let dataFromDtb = await _getData.getRecordsFromDtb('http://127.0.0.1:3000/tripsheets', 'GET')
        return dataFromDtb
    }

    /**
     * The method removes all records from the page
     * @private
     */
    private _deleteAllRecords(): void{
        const _records: NodeList = document.querySelectorAll('.record');
        for(let i = 0; i < _records.length; i++){
            const record: Node = _records[i];
            record.parentNode.removeChild(record);
        }
    }

    /**
     * A method to delete a record
     * The method calls the getRecords method to remove the record from the database, then removes all records from the page and writes the current records from the database again.
     * @param id {string} ID of the record we want to delete
     * @param location {element} The location where we want to write new current records
     */
    async deleteRecord(id: string, location: Element){
        const _getData = new Data();
        let dataFromDtb = await _getData.getRecordsFromDtb(`http://127.0.0.1:3000/tripsheets/${id}`, 'DELETE');
        this._deleteAllRecords();
        this._createRecord(location ,this._dataFromDtb());
    }

    /**
     * The method displays the entries to the page
     * @param location The location where we want to write new current records
     */
    showDrivingRecords(location: Element): void{
        this._createDOMRecordFilter(location);
        const _locationRecords = document.querySelector('.records');
        this._createRecord(_locationRecords, this._dataFromDtb());
    }
}
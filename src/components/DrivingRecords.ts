import {Data} from "../dtb/data.js";

export class DrivingRecords {

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

        paragraphDriver.innerText = 'Řidič';
        paragraphCar.innerText = 'Vozidlo';
        paragraphRegistrationNumber.innerText = 'SPZ';
        paragraphStartDrive.innerText = 'Počátek jízdy';
        paragraphEndDrive.innerText = 'Konec jízdy';

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

    private _createDOMRecord(location: Element, driver: string, car: string, registrationNumber: string, startDrive: string, endDrive: string): void{
        const recordDiv: HTMLDivElement = document.createElement('div');
        const driverDiv: HTMLDivElement = document.createElement('div');
        const carDiv: HTMLDivElement = document.createElement('div');
        const registrationNumberDiv: HTMLDivElement = document.createElement('div');
        const startDriveDiv: HTMLDivElement = document.createElement('div');
        const endDriveDiv: HTMLDivElement = document.createElement('div');
        const deleteRecordDiv: HTMLDivElement = document.createElement('div');
        const deleteRecordSpan: HTMLSpanElement = document.createElement('span');
        const deleteRecordImg: HTMLImageElement = document.createElement('img');

        recordDiv.setAttribute('class', 'record');
        driverDiv.setAttribute('class', 'driver');
        carDiv.setAttribute('class', 'car');
        registrationNumberDiv.setAttribute('class', 'registration-number');
        startDriveDiv.setAttribute('class', 'start-drive');
        endDriveDiv.setAttribute('class', 'end-drive');
        deleteRecordDiv.setAttribute('class', 'delete-record');
        deleteRecordSpan.setAttribute('class', 'delete-this-record');
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

    private _createRecord(location: Element, dataFromDtb: Promise<[]>){
        let data: Promise<void | []> = dataFromDtb.then(result =>
            result.forEach(data => {

                let _dateStartDriveCorrectLength: string = data['startDrive'];
                _dateStartDriveCorrectLength = _dateStartDriveCorrectLength.substring(0, 10);
                let _dateStartDriveArray: string[] = _dateStartDriveCorrectLength.split('-');
                let _newDateStartDrive: string = `${_dateStartDriveArray[0]} ${_dateStartDriveArray[1]} ${_dateStartDriveArray[2]}`;

                let _dateEndDriveCorrectLength: string = data['startDrive'];
                _dateEndDriveCorrectLength = _dateEndDriveCorrectLength.substring(0, 10);
                let _dateEndDriveArray: string[] = _dateEndDriveCorrectLength.split('-');
                let _newDateEndDrive: string = `${_dateEndDriveArray[0]} ${_dateEndDriveArray[1]} ${_dateEndDriveArray[2]}`;

                this._createDOMRecord(location, data['driver'], data['car'], data['SPZ'], _newDateStartDrive, _newDateEndDrive)
            })
        )
    }

    private async _test(){
        const test = new Data();
        let x = await test.getRecordsFromDtb('http://localhost:3000/tripsheets')
        return x
    }

    showDrivingRecords(locationRecordFilters: Element): void{
        this._createDOMRecordFilter(locationRecordFilters);

        const _locationRecords = document.querySelector('.records');

        this._createRecord(_locationRecords, this._test());
    }
}
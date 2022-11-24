var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Data } from "../dtb/data.js";
export class DrivingRecords {
    /**
     * Method for create Calendar with its DOM elements
     */
    _createDOMRecordFilter(location) {
        const recordFiltersDiv = document.createElement('div');
        const driverFilterDiv = document.createElement('div');
        const carFilterDiv = document.createElement('div');
        const registrationNumberFilter = document.createElement('div');
        const startDriveFilterDiv = document.createElement('div');
        const endDriverFilterDiv = document.createElement('div');
        const recordsDiv = document.createElement('div');
        const paragraphDriver = document.createElement('p');
        const paragraphCar = document.createElement('p');
        const paragraphRegistrationNumber = document.createElement('p');
        const paragraphStartDrive = document.createElement('p');
        const paragraphEndDrive = document.createElement('p');
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
    _createDOMRecord(location, driver, car, registrationNumber, startDrive, endDrive) {
        const recordDiv = document.createElement('div');
        const driverDiv = document.createElement('div');
        const carDiv = document.createElement('div');
        const registrationNumberDiv = document.createElement('div');
        const startDriveDiv = document.createElement('div');
        const endDriveDiv = document.createElement('div');
        const deleteRecordDiv = document.createElement('div');
        const deleteRecordSpan = document.createElement('span');
        const deleteRecordImg = document.createElement('img');
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
        recordDiv.appendChild(deleteRecordDiv);
        deleteRecordDiv.appendChild(deleteRecordSpan);
        deleteRecordSpan.appendChild(deleteRecordImg);
    }
    _createRecord(location, dataFromDtb) {
        let data = dataFromDtb.then(result => result.forEach(data => {
            let _newDateStartDrive = data['startDrive'];
            _newDateStartDrive = _newDateStartDrive.substring(0, 10);
            let _newDateEndDrive = data['startDrive'];
            _newDateEndDrive = _newDateEndDrive.substring(0, 10);
            this._createDOMRecord(location, data['driver'], data['car'], data['SPZ'], _newDateStartDrive, _newDateEndDrive);
        }));
    }
    _test() {
        return __awaiter(this, void 0, void 0, function* () {
            const test = new Data();
            let x = yield test.getRecordsFromDtb('http://localhost:3000/tripsheets');
            return x;
        });
    }
    showDrivingRecords(locationRecordFilters) {
        this._createDOMRecordFilter(locationRecordFilters);
        const _locationRecords = document.querySelector('.records');
        this._createRecord(_locationRecords, this._test());
    }
}

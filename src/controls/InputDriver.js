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
export class InputDriver {
    _createDOM(location, record) {
        const driversParagraph = document.createElement('p');
        driversParagraph.setAttribute('class', 'drivers-driver');
        driversParagraph.innerHTML = record;
        location.appendChild(driversParagraph);
    }
    _createRecords(location, dataFromDtb) {
        let data = dataFromDtb.then(result => result.forEach(data => {
            const record = `${data['name']} ${data['sureName']}`;
            this._createDOM(location, record);
        }));
    }
    _dataFromDtb() {
        return __awaiter(this, void 0, void 0, function* () {
            const _getData = new Data();
            let dataFromDtb = yield _getData.getRecordsFromDtb(`http://127.0.0.1:3000/drivers`, 'GET');
            return dataFromDtb;
        });
    }
    selectDriver(location, deleteLocation) {
        const drivers = document.querySelectorAll('.drivers-driver');
        drivers.forEach(driver => {
            driver.addEventListener('click', () => {
                const _selectedDriver = driver;
                location.value = _selectedDriver.innerHTML;
                this.deleteRecords(deleteLocation);
                this.deleteDivRecords(deleteLocation);
            });
        });
    }
    deleteRecords(location) {
        const x = location.childNodes.length;
        for (let i = 0; i < x; i++) {
            location.firstChild.remove();
        }
    }
    deleteDivRecords(location) {
        console.log(location);
        location.style.display = 'none';
    }
    showingRecords(location) {
        this._createRecords(location, this._dataFromDtb());
    }
}

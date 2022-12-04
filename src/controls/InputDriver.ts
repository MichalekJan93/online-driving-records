import {Data} from "../dtb/data.js";

export class InputDriver {

    private _createDOM(location: HTMLDivElement, record: string){
        const driversParagraph: HTMLParagraphElement = document.createElement('p');
        driversParagraph.setAttribute('class', 'drivers-driver');
        driversParagraph.innerHTML = record;

        location.appendChild(driversParagraph);
    }

    private _createRecords(location: HTMLDivElement, dataFromDtb: Promise<[]>){
        let data: Promise<void | []> = dataFromDtb.then(result =>
            result.forEach(data => {
                const record: string = `${data['name']} ${data['sureName']}`;
                this._createDOM(location, record);
            })
        )
    }

    private async _dataFromDtb(): Promise<[]>{
        const _getData = new Data();
        let dataFromDtb = await _getData.getRecordsFromDtb(`http://127.0.0.1:3000/drivers`, 'GET');
        return dataFromDtb;
    }

    selectDriver(location: HTMLInputElement, deleteLocation: HTMLDivElement): void{
        const drivers: NodeList = document.querySelectorAll('.drivers-driver');
        drivers.forEach(driver => {
            driver.addEventListener('click', () => {
                const _selectedDriver = driver as HTMLDivElement;
                location.value = _selectedDriver.innerHTML;
                this.deleteRecords(deleteLocation);
                this.deleteDivRecords(deleteLocation);
            } )
        })
    }

    deleteRecords(location: HTMLDivElement): void{
        const x = location.childNodes.length
        for(let i = 0; i < x; i++){
            location.firstChild.remove();
        }
    }

    deleteDivRecords(location: HTMLDivElement): void{
        console.log(location);
        location.style.display = 'none';
    }

    showingRecords(location: HTMLDivElement): void{
        this._createRecords(location, this._dataFromDtb())
    }
}
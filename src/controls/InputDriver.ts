import {Data} from "../dtb/data.js";

export class InputDriver {

    private _createDOM(location: HTMLDivElement, record: string){
        const driversParagraph: HTMLParagraphElement = document.createElement('p');

        driversParagraph.innerHTML = record;

        location.appendChild(driversParagraph);
    }

    private _createRecords(location: HTMLDivElement, dataFromDtb: Promise<[]>){
        let data: Promise<void | []> = dataFromDtb.then(result =>
            result.forEach(data => {
                const record: string = `${data['name']} ${data['sureName']}`;
                this._createDOM(location, record)
            })
        )
    }

    private async _dataFromDtb(): Promise<[]>{
        const _getData = new Data();
        let dataFromDtb = await _getData.getRecordsFromDtb(`http://127.0.0.1:3000/drivers`, 'GET');
        return dataFromDtb;
    }

    showingRecords(location: HTMLDivElement): void{
        this._createRecords(location, this._dataFromDtb())
    }
}
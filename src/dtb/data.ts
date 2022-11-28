export class Data {

    async getRecordsFromDtb(url: string, method: string): Promise<[]>{
        let response: Promise<[]> = fetch(url, {method: method})
            .then((response) => response.json())
        return response;
    }

}
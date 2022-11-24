export class Data {

    async getRecordsFromDtb(url: string): Promise<[]>{
        let response: Promise<[]> = fetch(url)
            .then((response) => response.json())
        return response;
    }

}
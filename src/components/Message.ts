/**
 * Class for create confirmation message
 */
export class Message {

    /**
     * A method for creating a dialog element and its DOM tree
     * @param {string} question The question we want to write in the message
     * @private
     */
    private _createMessageDom(question: string): HTMLDialogElement{
        const messageDialog: HTMLDialogElement = document.createElement('dialog');
        const topBoxDiv: HTMLDivElement = document.createElement('div');
        const paragraph: HTMLParagraphElement = document.createElement('p');
        const bottomBox: HTMLDivElement = document.createElement('div');
        const confirmButton: HTMLButtonElement = document.createElement('button');
        const cancelButton: HTMLButtonElement = document.createElement('button');

        messageDialog.setAttribute('class', 'message');
        topBoxDiv.setAttribute('class', 'top-box');
        bottomBox.setAttribute('class', 'bottom-box');
        confirmButton.setAttribute('class', 'confirm-message');
        confirmButton.setAttribute('tabindex', '-1');
        cancelButton.setAttribute('class', 'cancel-message')
        cancelButton.setAttribute('tabindex', '-1');


        confirmButton.innerHTML = 'Yes';
        cancelButton.innerHTML = 'No';
        paragraph.innerText = question;

        document.body.appendChild(messageDialog);
        messageDialog.appendChild(topBoxDiv);
        topBoxDiv.appendChild(paragraph);
        messageDialog.appendChild(bottomBox);
        bottomBox.appendChild(confirmButton);
        bottomBox.appendChild(cancelButton);

        return messageDialog;
    }

    /**
     * Method for show dialog with message
     * @param {string} question The question we want to write in the message
     */
    showDialog(question: string): HTMLDialogElement{
        const messageDialog = this._createMessageDom(question);
        messageDialog.showModal();
        return messageDialog;
    }

    /**
     * Method for delete dialog with message
     * @param {HTMLDialogElement} element Message dialog element which we will delete
     */
    deleteDialog(element: HTMLDialogElement): void{
        element.remove();
    }
}
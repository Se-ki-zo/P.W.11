class NewCardPopup extends Popup {
    constructor(popup) {
        super(popup);
        this.userCardName = popup.querySelector('input.popup__input_type_name');
        this.userCardURL = popup.querySelector('input.popup__input_type_link-url');
    }

    open() {
        this.userCardName.value = '';
        this.userCardURL.value = '';

        super.open();
    }
}
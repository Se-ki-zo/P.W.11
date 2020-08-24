class ImagePopup extends Popup {
    constructor(popup, imageUrl) {
        super(popup);
        this.imageUrl = imageUrl;
    }

    open(imageUrl) {
        this.popup.querySelector('.popup__image').setAttribute('src', imageUrl);
        super.open();
    }
}
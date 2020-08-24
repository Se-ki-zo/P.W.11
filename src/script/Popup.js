class Popup {
    constructor(popup) {
        this.popup = popup;
        this.errors = this.popup.querySelectorAll('span.popup__warning');
        this.submit = this.popup.querySelector('submit.submit');

        this.setEventListeners();
    }

    setEventListeners() {
        this.popup.querySelector('.popup__close').addEventListener('click', () => {
            this.close();
        });
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
    }
}
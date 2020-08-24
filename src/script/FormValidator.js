class FormValidator {
    constructor(popup) {
        this.popup = popup;
        this.inputs = this.popup.querySelectorAll('input.popup__input');
        this.errors = this.popup.querySelectorAll('span.popup__warning');
        this.submitButton = this.popup.querySelector('button.button.popup__add-button');


        this.setEventListeners();
    }

    checkInputValidity() {
        for (let i = 0; i < this.inputs.length; i++) {
            const inputs = this.inputs[i];
            const errors = this.errors[i];


            if (inputs.validity.valid) {
                errors.classList.remove('popup__warning_visible');
            } else {
                if (inputs.validity.valueMissing) {
                    errors.textContent = "Это обязательное поле";
                } else if (inputs.validity.typeMismatch && inputs.getAttribute('type') === 'url') {
                    errors.textContent = "Введите ссылку на картинку";
                } else if (inputs.validity.tooShort || inputs.validity.tooLong) {
                    const errorsMaxSymbolCount = inputs.getAttribute('maxlength');
                    const errorsMinSymbolCount = inputs.getAttribute('minlength');

                    errors.textContent = `Должно быть от ${errorsMinSymbolCount} до ${errorsMaxSymbolCount} символов`;
                }

                errors.classList.add('popup__warning_visible');
                return this.setSubmitButtonState(false);
            }
        }
        return this.setSubmitButtonState(true);
    }

    setSubmitButtonState(validationSuccess) {
        const btn = this.popup.querySelector('button.button');

        if (validationSuccess) {
            btn.classList.add('button_active');
            btn.removeAttribute('disabled');
        } else {
            btn.classList.remove('button_active');
            btn.setAttribute('disabled', '');
        }
    }

    setEventListeners() {
        const fields = this.inputs;

        for (let i = 0; i < fields.length; i++) {
            fields[i].addEventListener('input', e => {
                this.checkInputValidity();
            });
        }
    }

    resetErrorrs() {
        this.checkInputValidity();

        for (let i = 0; i < this.errors.length; i++) {
            this.errors[i].classList.remove('popup__warning_visible');
        }
    }
}
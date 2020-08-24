class Card {
    constructor(name, imageUrl, imagePopup) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.imagePopup = imagePopup;
    }

    create() {
        const createDivPlaceCard = document.createElement('div');
        const createDivPlaceCardImage = document.createElement('div');
        const createDivPlaceCardDescription = document.createElement('div');
        const createButtonDelete = document.createElement('button');
        const createH3 = document.createElement('h3');
        const createButtonLike = document.createElement('button');

        this.cardHTML = createDivPlaceCard;
        this.likeButton = createButtonLike;
        this.deleteButton = createButtonDelete;
        this.image = createDivPlaceCardImage;

        createDivPlaceCard.classList.add('place-card');
        createDivPlaceCardImage.classList.add('place-card__image');
        createDivPlaceCardImage.setAttribute('style', `background-image: url(${this.imageUrl})`);
        createButtonDelete.classList.add('place-card__delete-icon');
        createDivPlaceCardDescription.classList.add('place-card__description');
        createH3.classList.add('place-card__name');
        createH3.textContent = this.name;
        createButtonLike.classList.add('place-card__like-icon');

        createDivPlaceCard.appendChild(createDivPlaceCardImage);
        createDivPlaceCard.appendChild(createDivPlaceCardDescription);
        createDivPlaceCardImage.appendChild(createButtonDelete);
        createDivPlaceCardDescription.appendChild(createH3);
        createDivPlaceCardDescription.appendChild(createButtonLike);

        this.setEventListeners();

        return createDivPlaceCard;
    }

    setEventListeners() {
        this.closeClick = e => {
            e.stopPropagation();
            this.remove();
        };

        this.imageOpen = () => {
            this.imagePopup.open(this.imageUrl);
        }

        this.likeButton.addEventListener('click', this.like);
        this.image.addEventListener('click', this.imageOpen);
        this.deleteButton.addEventListener('click', this.closeClick);
    }

    removeEventListeners() {
        this.likeButton.removeEventListener('click', this.like);
        this.image.removeEventListener('click', this.imageOpen);
        this.deleteButton.removeEventListener('click', this.closeClick);
    }

    like() {
        this.classList.toggle('place-card__like-icon_liked');
    }

    remove() {
        this.removeEventListeners();
        this.cardHTML.remove();
    }
}
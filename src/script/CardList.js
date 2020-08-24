class CardList {
    constructor(cardsContainer, initialCards, card) {
        this.cardsContainer = cardsContainer;
        this.initialCards = initialCards;
    }

    addCard(cardElement) {
        this.cardsContainer.appendChild(cardElement);
    }

    render() {
        this.cardsContainer.innerHTML = '';

        this.initialCards.forEach((card) => {
            const cardElement = card.create();
            this.addCard(cardElement);
        });
    }
}
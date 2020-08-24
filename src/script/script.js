const cardsContainer = document.querySelector('.places-list.root__section');
const divPopupEditProfile = document.querySelector('div.popup.root__about');
const divPopupImage = document.querySelector('div.root__image');
const divPopupNewCard = document.querySelector('div.root__new-card');

const userPhoto = document.querySelector('div.user-info__photo');
const userNameHTML = document.querySelector('h1.user-info__name');
const userAboutHTML = document.querySelector('p.user-info__job');

const formNewCardValidator = new FormValidator(divPopupNewCard);
const formEditValidator = new FormValidator(divPopupEditProfile);
const newCardPopup = new NewCardPopup(divPopupNewCard);
const userInfo = new UserInfo(userNameHTML, userAboutHTML, userPhoto);
const imagePopup = new ImagePopup(divPopupImage);
const cardlist = new CardList(cardsContainer);
const options = {
    url: 'https://praktikum.tk/cohort12/',
    getRequest: {
        headers: {
            authorization: '5783e296-2ee3-4f4f-aa27-91c21b36586c'
        }
    },
    // postRequest: {
    //     method: 'PATCH',
    //     headers: {
    //         authorization: '5783e296-2ee3-4f4f-aa27-91c21b36586c',
    //         'Content-Type': 'application/json'
    //     },
    //     // body: JSON.stringify({
    //     //     name: userName,
    //     //     about: userAbout
    //     // })
    // }
};
const api = new Api(options);
const editProfilePopup = new EditProfilePopup(divPopupEditProfile, userInfo, userNameHTML, userAboutHTML, api);

/*
    Можно лучше: написать загрузку данных с использованием Promise.all
    https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Promise/all

    Выглядит этот код примерно так:
    Promise.all([     //в Promise.all передаем массив промисов которые нужно выполнить
        this.api.getUserData(),
        this.api.getInitialCards()
    ])    
        .then((values)=>{    //попадаем сюда когда оба промиса будут выполнены
            const [userData, initialCards] = values;
            .................
        })
        .catch((err)=>{     //попадаем сюда если один из промисов завершаться ошибкой
            console.log(err);
        })
*/
api.getInitialCards()
    .then((data) => {
        const cards = data.map(i => new Card(i.name, i.link, imagePopup));
        /*
            Можно лучше: не создавать новый экземпляр CardList, а сделать передачу
            массива карточек в класс CardList как параметр метода render 
        */
        const cardlist = new CardList(cardsContainer, cards);
        cardlist.render();
    })
    .catch((err) => {
        console.log(err);
    });

api.getUserInfo()
    .then((data) => {
        userInfo.setUserInfo(data.name, data.about);
        userInfo.updateUserPhoto(data.avatar);
    })
    .catch((err) => {
        console.log(err);
    });



document.querySelector('.button.user-info__edit').addEventListener('click', () => {
    editProfilePopup.open();
    formEditValidator.resetErrorrs();
});

document.querySelector('.button.user-info__button').addEventListener('click', () => {
    newCardPopup.open();
    formNewCardValidator.resetErrorrs();
});

newCardPopup.popup.addEventListener('submit', e => {
    e.preventDefault();

    const card = new Card(newCardPopup.userCardName.value, newCardPopup.userCardURL.value, imagePopup);
    cardlist.addCard(card.create());

    newCardPopup.close();
});

/*
  Хорошая работа, класс Api создан и данные с сервера загружаются
  Но есть несколько замечаний:

  Надо исправить:
  - все изменения на странице должны происходить, только после того, как
    сервер ответил подтверждением. Сейчас данные пользователя сохраняются на странице, даже если
    запрос завершился с ошибкой (например нет интернета)
    Попап так же должен закрываться, если запрос выполнился успешно

    Проверить как ведет себя страница, если запросы выполняются с ошибой, можно отключив
    интернет на вкладке Network в devtools http://prntscr.com/tlq8q5

  Можно лучше:
  - для загрузки начальных данных использовать Promise.all
  - не создавать новый экземпляр CardList, а передавать данные как параметр метода render

*/

/*
  Отлично, критическое замечание исправлено

  Для закрепления полученных знаний советую сделать и оставшуюся часть задания
  и поработать над местами, которые отмечены как "Можно лучше"

  Если у Вас будет свободное время попробуйте освоить работу с сервером
  применив async/await для работы с асинхронными запросами.
  https://learn.javascript.ru/async-await
  https://habr.com/ru/company/ruvds/blog/414373/
  https://www.youtube.com/watch?v=SHiUyM_fFME
  Это часто используется в реальной работе

  Успехов в дальнейшем обучении!
*/
"use strict";

(() => {
  const map = document.querySelector(`.map`);
  const pinMap = document.querySelector(`.map__pins`);
  const ESC_KEYCODE = 27;

  //   Новый элемент с заданным атрибутом class
  const createElem = (elemName, elemClass) => {
    const newElement = document.createElement(elemName);
    newElement.className = elemClass;
    return newElement;
  };
  // Новый элемент img с заданными атрибутами
  const createImg = (src, width, height, alt, elemClass) => {
    const newImg = createElem(`img`, elemClass);
    newImg.src = src;
    newImg.width = width;
    newImg.height = height;
    newImg.alt = alt;
    return newImg;
  };

  // Переименовывание типов жилья
  const translateType = (type) => {
    switch (type) {
      case `palace`:
        return `Дворец`;
      case `flat`:
        return `Квартира`;
      case `house`:
        return `Дом`;
      case `bungalo`:
        return `Бунгало`;
      default:
        return type;
    }
  };
  //  Коллекция фотографий жилья
  const createAlbum = (items) => {
    const fragment = document.createDocumentFragment();

    for (const item of items) {
      const photo = createImg(item, 45, 40, `Фотография жилья`, `popup__photo`);
      photo.className = `popup__photo`;
      fragment.appendChild(photo);
    }

    return fragment;
  };
  // коллекция опций
  const createFeautures = (items) => {
    const fragment = document.createDocumentFragment();
    for (const element of items) {
      const feauture = createElem(
          element,
          `li`,
          `popup__feature popup__feature-- ${items[items]} `
      );
      feauture.className = `popup__feature popup__feature-- ${items[items]} `;
      fragment.appendChild(feauture);
    }

    return fragment;
  };
  // Заполнение данными карточки объявления
  const fillCard = (obj) => {
    const defaultCard = document
      .querySelector(`#card`)
      .content.querySelector(`.map__card`);
    const postCard = defaultCard.cloneNode(true);
    // кнопкa закрытия карточки
    const cardClose = postCard.querySelector(`.popup__close`);
    //  Блок для фотографий
    const album = postCard.querySelector(`.popup__photos`);
    // очищения блока для фото
    album.textContent = ``;

    //  Блок для списка опций
    const feauturesList = postCard.querySelector(`.popup__features `);
    feauturesList.textContent = ` `;
    postCard.querySelector(`.popup__title`).textContent = obj.offer.title;
    postCard.querySelector(`.popup__text--address`).textContent =
      obj.offer.address;
    postCard.querySelector(`.popup__text--price`).textContent =
      obj.offer.price + `₽/ночь`;
    postCard.querySelector(`.popup__type`).textContent = translateType(
        obj.offer.type
    );
    postCard.querySelector(`.popup__text--capacity`).textContent =
      obj.offer.rooms + ` комнаты для ${obj.offer.guests}$ {гостей}`;
    postCard.querySelector(
        `.popup__text--time`
    ).textContent = `Заезд после ${obj.offer.checkin} , выезд до  ${obj.offer.checkout} `;
    feauturesList.appendChild(createFeautures(obj.offer.features));
    postCard.querySelector(`.popup__description`).textContent =
      obj.offer.description;
    album.appendChild(createAlbum(obj.offer.photos));
    postCard
      .querySelector(`.popup__avatar`)
      .setAttribute(`src`, obj.author.avatar);
    // закрытие карточки
    cardClose.addEventListener(`click`, onCardCloseClick);
    return postCard;
  };
  //  Отрисовывает карточку объявления (Метод отрисовки карточки)
  const createCard = (obj) => {
    pinMap.parentNode.insertBefore(fillCard(obj), pinMap.nextSibling);
    document.addEventListener(`keydown`, onCardEscPress);
  };
  // нахожу карточку и удаляю её.
  const removeCard = () => {
    const card = map.querySelector(`.map__card`);
    card.remove();
    document.removeEventListener(`keydown`, onCardEscPress);
  };

  //  удаляю карточку при нажатии на кнопку закрытия
  const onCardCloseClick = () => {
    removeCard();
  };

  //  удаляю карточку при нажатии ESC
  const onCardEscPress = (evt) => {
    if (evt.keyCode === ESC_KEYCODE) {
      removeCard();
    }
  };

  window.card = {
    createCard,
    removeCard,
  };
})();

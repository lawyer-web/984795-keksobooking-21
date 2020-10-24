'use strict';

/* Новый элемент с заданным атрибутом class */
const createElem = (elemName, elemClass)=> {
  var newElement = document.createElement(elemName);
  newElement.className = elemClass;
  return newElement;
};

/* Новый элемент img с заданными атрибутами  */
const createImg = (src, width, height, alt, elemClass)=> {
  var newImg = createElem('img', elemClass);
  newImg.src = src;
  newImg.width = width;
  newImg.height = height;
  newImg.alt = alt;
  return newImg;
};

/* Переименовывание типов жилья */
const translateType = (type)=> {
  switch (type) {
    case 'palace':
      return 'Дворец';
    case 'flat':
      return 'Квартира';
    case 'house':
      return 'Дом';
    case 'bungalo':
      return 'Бунгало';
    default:
      return type;
  }
};

/* Коллекция фотографий жилья */
const createAlbum = function (items) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    photo.className = 'popup__photo';
    photo.setAttribute('src', items[i]);
    photo.setAttribute('width', 45);
    photo.setAttribute('height', 40);
    photo.setAttribute('alt', 'Фотография жилья');
    var photo = createImg(items[i], 45, 40, 'Фотография жилья', 'popup__photo');
    fragment.appendChild(photo);
  }

  return fragment;
};

/* Коллекция опций */
const createFeautures = (items)=> {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < items.length; i++) {
    var feauture = createElem('li', 'popup__feature popup__feature--' + items[i]);
    feauture.className = 'popup__feature popup__feature--' + items[i];
    fragment.appendChild(feauture);
  }

  return fragment;
};

/* Заполнение данными карточки объявления */

const fillCard = (obj) =>{
  var defaultCard = document.querySelector('#card').content.querySelector('.map__card');
  var postCard = defaultCard.cloneNode(true);

  /* Блок для фотографий */
  const album = postCard.querySelector('.popup__photos');
  album.textContent = '';

  /* Блок для списка опций */

  const feauturesList = postCard.querySelector('.popup__features');
  feauturesList.textContent = '';

  postCard.querySelector('.popup__title').textContent = obj.offer.title;
  postCard.querySelector('.popup__text--address').textContent = obj.offer.address;
  postCard.querySelector('.popup__text--price').textContent = obj.offer.price + '₽/ночь';
  postCard.querySelector('.popup__type').textContent = translateType(obj.offer.type);
  postCard.querySelector('.popup__text--capacity').textContent = obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей';
  postCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout;
  feauturesList.appendChild(createFeautures(obj.offer.feautures));
  postCard.querySelector('.popup__description').textContent = obj.offer.description;
  album.appendChild(createAlbum(obj.offer.photos));
  postCard.querySelector('.popup__avatar').setAttribute('src', obj.author.avatar);
  return postCard;
};

/* Отрисовывает карточку объявления */
let pinMap;
let data;
const createCard = (obj)=> {
  pinMap.parentNode.insertBefore(fillCard(obj), pinMap.nextSibling);
};
createCard(data[0]);

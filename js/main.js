'use strict';

const TYPES = [`palace`, `flat`, `house`, `bungalow`];

const TIMES = [`12:00`, `13:00`, `14:00`];

const OPTIONS = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

const PHOTO = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const map = document.querySelector(`.map`);
const pinMap = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

/* 1.Функция генерации случайного числа */

const getRandomInt = (min, max)=>Math.floor(Math.random() * (max - min + 1)) + min;

/* 2.Функция выбора случайного элемента массива */

const getRandomElement = (items)=>items[getRandomInt(0, items.length - 1)];

/* 3. Функция перетасовки массива */

const getMixArr = (items)=> {
  return items.slice().sort(function () {
    return Math.random() - 0.5;
  });
};

/* 4.Функция генерации объекта с объявлением */

const Price = {
  MIN: 1000,
  MAX: 100000
};

const Random = {
  MIN: 130,
  MAX: 630
};

const Rooms = {
  MIN: 1,
  MAX: 5
};

const Quests = {
  MIN: 1,
  MAX: 10
};

const generatePost = (number) => {
  const location = {
    x: getRandomInt(0, map.offsetWidth),
    y: getRandomInt(Random.MIN, Random.MAX)
  };
  const post = {
    author: {
      avatar: `img/avatars/user0${number}.png`
    },
    offer: {
      title: `Квартира ${number}`,
      address: `${location.x}, ${location.y }`,
      price: getRandomInt(Price.MIN, Price.MAX),
      type: getRandomElement(TYPES),
      rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
      guests: getRandomInt(Quests.MIN, Quests.MAX),
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getMixArr(OPTIONS).slice(0, getRandomInt(1, OPTIONS.length)),
      description: `строка с описанием`,
      photos: getMixArr(PHOTO).slice(0, getRandomInt(1, PHOTO.length))
    },
    location
  };
  return post;
};

/* 5.Функция создания массива случайных объявлений */
const generatePosts = ()=> {
  const data = [];
  for (let i = 1; i <= 8; i++) {
    data.push(generatePost(i));
  }
  return data;
};
const posts = generatePosts();

/* 6. Функция переключения карты в активное состояние */
const activeMap = ()=> {
  map.classList.remove(`map--faded`);
};

/* 7. Функция сoздания метки случайного объявления */
const fillMap = function () {
  const pinsFragment = document.createDocumentFragment();
for (let post of posts) {
  const clonedPinTemplate = pinTemplate.cloneNode(true);
  clonedPinTemplate.style = `left:${post.location.x + Pin.WIDTH / 2}px; top:${post.location.y + Pin.HEIGHT}px;`;
  clonedPinTemplate.querySelector(`img`).setAttribute(`src`, post.author.avatar);
  clonedPinTemplate.querySelector(`img`).setAttribute(`alt`, post.offer.title);
  pinsFragment.appendChild(clonedPinTemplate);
}
pinMap.appendChild(pinsFragment);
};

// Второе задание

//  Новый элемент с заданным атрибутом class
const createElem = (elemName, elemClass)=> {
  const newElement = document.createElement(elemName);
  newElement.className = elemClass;
  return newElement;
};

//  Новый элемент img с заданными атрибутами
const createImg = (src, width, height, alt, elemClass)=> {
  const newImg = createElem(`img`, elemClass);
  newImg.src = src;
  newImg.width = width;
  newImg.height = height;
  newImg.alt = alt;
  return newImg;
};

// Переименовывание типов жилья
const translateType = (type)=> {
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
const createAlbum = (items)=> {
  const fragment = document.createDocumentFragment();

  for (let item of items) {
    const photo = createImg(item, 45, 40, `Фотография жилья`, `popup__photo`);
    photo.className = `popup__photo`;
    fragment.appendChild(photo);
  }

  return fragment;
};

//  Коллекция опций
const createFeautures = (items)=> {
  const fragment = document.createDocumentFragment();
  for (let element of items) {
    const feauture = createElem(element, `li`, `popup__feature popup__feature-- ${items[items]} `);
    feauture.className = `popup__feature popup__feature-- ${items[items]} `;
    fragment.appendChild(feauture);
  }

  return fragment;
};

// Заполнение данными карточки объявления
const fillCard = (obj) =>{
  const defaultCard = document.querySelector(`#card`).content.querySelector(`.map__card`);
  const postCard = defaultCard.cloneNode(true);

  //  Блок для фотографий
  const album = postCard.querySelector(`.popup__photos`);
  album.textContent = ` `;

  //  Блок для списка опций
  const feauturesList = postCard.querySelector(`.popup__features `);
  feauturesList.textContent = ` `;
  postCard.querySelector(`.popup__title`).textContent = obj.offer.title;
  postCard.querySelector(`.popup__text--address`).textContent = obj.offer.address;
  postCard.querySelector(`.popup__text--price`).textContent = obj.offer.price + `₽/ночь`;
  postCard.querySelector(`.popup__type`).textContent = translateType(obj.offer.type);
  postCard.querySelector(`.popup__text--capacity`).textContent = obj.offer.rooms + ` комнаты для ${ obj.offer.guests}$ {гостей}`;
  postCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${obj.offer.checkin} , выезд до  ${obj.offer.checkout} `;
  feauturesList.appendChild(createFeautures(obj.offer.features));
  postCard.querySelector(`.popup__description`).textContent = obj.offer.description;
  album.appendChild(createAlbum(obj.offer.photos));
  postCard.querySelector(`.popup__avatar`).setAttribute(`src`, obj.author.avatar);
  return postCard;
};
//  Отрисовывает карточку объявления (Метод отрисовки карточки)
const createCard = (obj)=> {
  pinMap.parentNode.insertBefore(fillCard(obj), pinMap.nextSibling);
};

// Третье задание
const ENTER_KEYCODE = 13;
const MAIN_PIN_WIDTH = 62;
const MAIN_PIN_HEIGHT = 62;
const TAIL_OF_MAIN_PIN_HEIGHT = 22;

// главная метка для перевода в активное состояние
const mainPin = map.querySelector(`.map__pin--main`);

// форма объявления
const form = document.querySelector(`.ad-form `);
// console.log(form);

// кнопка отправки формы
const formSubmit = form.querySelector(`.ad-form__submit`);
// console.log(formSubmit)

// input для ввода адреса
const adressInput = document.querySelector(`#address`);

// отключение активных полей
const formHeader = document.querySelector(`.ad-form-header`).setAttribute(`disabled`, `true`);

const adFormElement = document.querySelectorAll(`.ad-form__element`);
for (let element of adFormElement) {
  // console.log(element);
  element.setAttribute(`disabled`, true);
}

// недоступные элементы формы в исходном состоянии
const formDisabledElements = form.querySelectorAll(`[disabled]`);
// console.log(formDisabledElements);

// активирование формы
const formActivation = () => {
  form.classList.remove(`ad-form--disabled`);
  removeDisabledAttr(formDisabledElements);
  fillAddressInput(getMainPinPosition());
};

// функция активации страницы
const activatePage = () =>{
  activeMap();
  fillMap(posts);
  createCard(posts[0]);
  formActivation();
  createCard(posts[0]);

};

// добавляю обработчик события mousedown на элемент .map__pin--main
mainPin.addEventListener(`mousedown`, function () {
  console.log(`Кнопка нажaта`);
  activatePage();

});

// нахожу координаты главный метки
const getMainPinPosition = ()=> {
  const coordinates = {
    'x': Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
    'y': Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2)
  };
  if (!map.classList.contains(`map--faded`)) {
    coordinates.y = coordinates.y + TAIL_OF_MAIN_PIN_HEIGHT;
  }
  return coordinates;
};

// заполняю поля адреса с координатами метки
const fillAddressInput = function (obj) {
  adressInput.value = obj.x + `,` + obj.y;
  console.log(obj);
};

// удаление атрибута disabled
const removeDisabledAttr = function (items) {
  for (let i = 0; i < items.length; i++) {
    items[i].disabled = false;
  }
};

// перевод страницы в активный режим с клавиатуры.
mainPin.addEventListener(`keydown`, (evt)=> {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePage();

  }
});

// количество комнат
const numberRoomsSelect = document.querySelector(`#room_number`);

// количество гостей(мест)
const numberQuestsSelect = document.querySelector(`#capacity`);

// Сравниваю количество комнат с количеством гостей
const compareRoomsAndQuests = () => {
  const numberRooms = parseInt(numberRoomsSelect.value, 10);
  const numberQuests = parseInt(numberQuestsSelect.value, 10);
  const mismatch = ` `;
  if (numberRooms === 1 && numberQuests !== 1) {
    mismatch = `1 комната - для 1 гостя`;
  } else if (numberRooms === 2 && (numberQuests !== 1 && numberQuests !== 1)) {
    mismatch = `2 комнаты — для 2 гостей или для 1 гостя`;
  } else if (numberRooms === 3 && numberQuests !== 0) {
    mismatch = `3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя`;
  } else if (numberRooms === 100 && numberQuests !== 0) {
    mismatch = `100 комнат — не для гостей`;
  }
  return mismatch;
};

formSubmit.addEventListener(`click`, function () {
  numberQuestsSelect.setCustomValidity(compareRoomsAndQuests());
});

fillAddressInput(getMainPinPosition());

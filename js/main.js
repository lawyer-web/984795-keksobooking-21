'use strict';

const TYPES = ['palace', 'flat', 'house', 'bungalow'];

const TIMES = ['12:00', '13:00', '14:00'];

const OPTIONS = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];

const PHOTO = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const map = document.querySelector('.map');
const pinMap = document.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

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
  map.classList.remove('map--faded');
};
activeMap();

/* 7. Функция сoздания метки случайного объявления */

const pinsFragment = document.createDocumentFragment();
for (let post of posts) {
  const clonedPinTemplate = pinTemplate.cloneNode(true);
  clonedPinTemplate.style = `left:${post.location.x - Pin.WIDTH / 2}px; top: ${post.location.y - Pin.HEIGT}px`;
  clonedPinTemplate.querySelector('img').setAttribute('src', post.author.avatar);
  clonedPinTemplate.querySelector('img').setAttribute('alt', post.offer.title);
  pinsFragment.appendChild(clonedPinTemplate);
}
pinMap.appendChild(pinsFragment);

// Задание №2



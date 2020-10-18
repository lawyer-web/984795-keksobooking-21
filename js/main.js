'use strict';

var offer = {
   author: {
        avatar:`img/avatars/user01.png`,
    },
    offer: {
        "title": `Квартира 1`,
        "address":`600, 350`,
        "price": 1000,
        "type": `palace`,
        "rooms": 5,
        "guests": 10,
        "checkin": `14:00`,
        "checkout": `13:00,`
    },
    "location": {
        "x": 10,
        "y": 130
    }
};

var TITLES = ['Квартира 1', 'Квартира 2', 'Квартира 3', 'Квартира 4', 'Квартира 5', 'Квартира 6', 'Квартира 7', 'Квартира 8'];
var TYPES = ['palace', 'flat', 'house', 'bungalow'];
var TIMES = ['12:00', '13:00', '14:00'];
var OPTIONS = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var PHOTO = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

var map = document.querySelector('.map');
var pinMap = document.querySelector('.map__pins');
var template = document.querySelector('#pin').content.querySelector('.map__pin');

/* 1.Функция генерации случайного числа */

var getRandomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/* 2.Функция выбора случайного элемента массива */

var getRandomArrElem = function (arr) {
  var rand = getRandomInt(0, arr.length - 1);
  return arr[rand];
};

/* 3. Функция перетасовки массива */

var getMixArr = function (arr) {
  var mixArr = arr.slice().sort(function () {
    return 0.5 - Math.random();
  });
  return mixArr;
};

/* 4.Функция генерации объекта с объявлением */

var generatePost = function (number) {
  var post = {
    'author': {
      'avatar': 'img/avatars/user0' + (number + 1) + '.png'
    },
    'offer': {
      'title': TITLES[number],
      'address': '600, 350',
      'price': getRandomInt(1000, 100000),
      'type': getRandomArrElem(TYPES),
      'rooms': getRandomInt(1, 5),
      'guests': getRandomInt(1, 10),
      'checkin': getRandomArrElem(TIMES),
      'checkout': getRandomArrElem(TIMES),
      'feautures': getMixArr(OPTIONS).slice(0, getRandomInt(1, OPTIONS.length)),
      'description': 'строка с описанием',
      'photos': getMixArr(PHOTO).slice(0, getRandomInt(1, PHOTO.length))
    },
    'location': {
      'x': getRandomInt(0, map.offsetWidth),
      'y': getRandomInt(130, 630)
    }
  };
  return post;
};

/* 5.Функция создания массива случайных объявлений */
var generateData = function () {
  var data = [];
  for (var i = 0; i < 8; i++) {
    console.log(i);
    data.push(generatePost(i));
  }
  return data;
};
var data = generateData();
console.log(data);

/* 6. Функция переключения карты в активное состояние */
var activeMap = function () {
  map.classList.remove('map--faded');
};

/* 7. Функция сoздания метки случайного объявления */


// const data = [];

// for (var i = 0; i < 8; i++) {
//   console.log(i);
//   data.push({
//    author: {
//         avatar:`img/avatars/user0${i}.png`,
//     },
//     offer: {
//         "title": (TITLES[i]),
//         "address":`600, 350`,
//         "price": getRandomInt(1000,100000),
//         "type":getRandomArrElem(TYPES) ,
//         "rooms": getRandomInt(1,5),
//         "guests": getRandomInt(1,10),
//         "checkin": getRandomArrElem(TIMES),
//         "checkout": getRandomArrElem(TIMES),
//         "feautures": getMixArr(OPTIONS).slice(0, getRandomInt(1, OPTIONS.length)),
//         "description": `строка с описанием`,
//         "photos": getMixArr(PHOTO).slice(0, getRandomInt(1, PHOTO.length))
//     },
//         "location": {
//         "x": 10,
//         "y":getRandomInt(130,630)
//       }

// });
// }
// console.log(data);

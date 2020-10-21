'use strict';

const offer = {
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

const TYPES = ['palace', 'flat', 'house', 'bungalow'];
const TIMES = ['12:00', '13:00', '14:00'];
const OPTIONS = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const PHOTO = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

const PINWIDTH = 50;
const PINHEIGT = 70;

const map = document.querySelector('.map');
const pinMap = document.querySelector('.map__pins');
const pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

/* 1.Функция генерации случайного числа */

const getRandomInt = (min, max)=>Math.floor(Math.random() * (max - min + 1)) + min;

/* 2.Функция выбора случайного элемента массива */

const getRandomElement =(items)=>items[getRandomInt(0, items.length - 1)];

/* 3. Функция перетасовки массива */

const getMixArr =(items)=>items.slice().sort( ()=> {0.5 - Math.random();
  });

/* 4.Функция генерации объекта с объявлением */

const Price = {
  MIN: 1000,
  MAX:100000
};

const Random = {
  MIN: 130,
  MAX:630
};

const Rooms={
  MIN:1,
  MAX:5
};

const Quests = {
  MIN: 1,
  MAX:10
};

const generatePost = (number) => {
  const location = {
    x: getRandomInt(0, map.offsetWidth),
    y: getRandomInt(Random.MIN,Random.MAX )
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
      rooms: getRandomInt(Rooms.MIN,Rooms.MAX),
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
const generatePosts =()=> {
  const data = [];
  for (var i = 1; i <= 8; i++) {
    console.log(i);
    data.push(generatePost(i));
  }
  return data;
};
const posts = generatePosts();
console.log(posts);

/* 6. Функция переключения карты в активное состояние */
const activeMap =()=> {
  map.classList.remove('map--faded');
};
activeMap();

/* 7. Функция сoздания метки случайного объявления */

const pinsFragment = document.createDocumentFragment();
for (let post of posts) {
  const clonedPinTemplate = pinTemplate.cloneNode(true);
  clonedPinTemplate.style = `left:${post.location.x-PINWIDTH/2}px; top: ${post.location.y-PINHEIGT}px;`
  clonedPinTemplate.querySelector('img').setAttribute('src', post.author.avatar);
  clonedPinTemplate.querySelector('img').setAttribute('alt', post.offer.title);
  pinsFragment.appendChild(clonedPinTemplate);
  console.log(post,clonedPinTemplate);
}
pinMap.appendChild(pinsFragment);






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

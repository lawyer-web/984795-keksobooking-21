"use strict";

(() => {
  const TYPES = [`palace`, `flat`, `house`, `bungalow`];

  const TIMES = [`12:00`, `13:00`, `14:00`];

  const OPTIONS = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];

  const PHOTO = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];
  const Price = {
    MIN: 1000,
    MAX: 100000,
  };

  const Random = {
    MIN: 130,
    MAX: 630,
  };

  const Rooms = {
    MIN: 1,
    MAX: 5,
  };

  const Quests = {
    MIN: 1,
    MAX: 10,
  };
  const map = document.querySelector(`.map`);
  const getRandomElement = (items) => items[getRandomInt(0, items.length - 1)];
  const getRandomInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;
  const getMixArr = (items) => {
    return items.slice().sort(function () {
      return Math.random() - 0.5;
    });
  };

  const generatePost = (number) => {
    const location = {
      x: getRandomInt(0, map.offsetWidth),
      y: getRandomInt(Random.MIN, Random.MAX),
    };
    const post = {
      author: {
        avatar: `img/avatars/user0${number}.png`,
      },
      offer: {
        title: `Квартира ${number}`,
        address: `${location.x}, ${location.y}`,
        price: getRandomInt(Price.MIN, Price.MAX),
        type: getRandomElement(TYPES),
        rooms: getRandomInt(Rooms.MIN, Rooms.MAX),
        guests: getRandomInt(Quests.MIN, Quests.MAX),
        checkin: getRandomElement(TIMES),
        checkout: getRandomElement(TIMES),
        features: getMixArr(OPTIONS).slice(0, getRandomInt(1, OPTIONS.length)),
        description: `строка с описанием`,
        photos: getMixArr(PHOTO).slice(0, getRandomInt(1, PHOTO.length)),
      },
      location,
    };
    return post;
  };
  const generatePosts = () => {
    const data = [];
    for (let i = 1; i <= 8; i++) {
      data.push(generatePost(i));
    }
    return data;
  };
  window.data = {
    generatePosts
  };
})();

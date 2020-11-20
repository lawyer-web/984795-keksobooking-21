"use strict";

(() => {
  const Pin = {
    WIDTH: 50,
    HEIGHT: 70,
  };
  const MAIN_PIN_WIDTH = 62;
  const MAIN_PIN_HEIGHT = 62;
  const TAIL_OF_MAIN_PIN_HEIGHT = 22;
  const map = document.querySelector(`.map`);
  const pinMap = document.querySelector(`.map__pins`);
  const pinTemplate = document
    .querySelector(`#pin`)
    .content.querySelector(`.map__pin`);
  const posts = window.data.generatePosts();

  // главная метка для перевода в активное состояние
  const mainPin = map.querySelector(`.map__pin--main`);

  // нахожу координаты главной метки
  const getMainPinPosition = () => {
    const coordinates = {
      x: Math.round(mainPin.offsetLeft + MAIN_PIN_WIDTH / 2),
      y: Math.round(mainPin.offsetTop + MAIN_PIN_HEIGHT / 2),
    };
    if (!map.classList.contains(`map--faded`)) {
      coordinates.y = coordinates.y + TAIL_OF_MAIN_PIN_HEIGHT;
    }
    return coordinates;
  };

  // Функция отрисовки метки случайного объявления
  const fillMap = () => {
    const pinsFragment = document.createDocumentFragment();
    for (const post of posts) {
      const clonedPinTemplate = pinTemplate.cloneNode(true);
      clonedPinTemplate.style = `left:${
        post.location.x + Pin.WIDTH / 2
      }px; top:${post.location.y + Pin.HEIGHT}px;`;
      clonedPinTemplate
        .querySelector(`img`)
        .setAttribute(`src`, post.author.avatar);
      clonedPinTemplate
        .querySelector(`img`)
        .setAttribute(`alt`, post.offer.title);
      pinsFragment.appendChild(clonedPinTemplate);
    }
    pinMap.appendChild(pinsFragment);
  };
  //   Функция переключения карты в активное состояние
  const activeMap = () => {
    map.classList.remove(`map--faded`);
  };

  window.map = {
    fillMap,
    getMainPinPosition,
    activeMap
  };
})();

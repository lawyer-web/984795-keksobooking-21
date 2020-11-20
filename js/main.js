"use strict";
const map = document.querySelector(`.map`);

//  Функция создания массива случайных объявлений
const posts = window.data.generatePosts();

// главная метка для перевода в активное состояние
const mainPin = map.querySelector(`.map__pin--main`);

// input для ввода адреса
const adressInput = document.querySelector(`#address`);

// заполняю поля адреса с координатами метки
const fillAddressInput = (obj) => {
  adressInput.value = obj.x + `,` + obj.y;
};

// активирую страницу
const activatePage = () => {
  window.map.activeMap();
  window.map.fillMap();
  window.card.createCard(posts[0]);
  window.form.formActivation();
};

mainPin.addEventListener(`click`, () => {
  activatePage();
});

fillAddressInput(window.map.getMainPinPosition());

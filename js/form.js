"use strict";

(() => {
  // форма объявления
  const form = document.querySelector(`.ad-form `);
  // кнопка отправки формы
  const formSubmit = form.querySelector(`.ad-form__submit`);
  // недоступные элементы формы в исходном состоянии
  const formDisabledElements = form.querySelectorAll(`[disabled]`);
  // количество комнат
  const numberRoomsSelect = document.querySelector(`#room_number`);

  // количество гостей(мест)
  const numberGestsSelect = document.querySelector(`#capacity`);

  // input для ввода адреса
  const adressInput = document.querySelector(`#address`);

  // заполняю поля адреса с координатами метки
  const fillAddressInput = (obj) => {
    adressInput.value = obj.x + `,` + obj.y;
  };
  // сравниваю количество комнат с количеством гостей
  const compareRoomsAndGests = () => {
    const numberRooms = parseInt(numberRoomsSelect.value, 10);
    const numberGests = parseInt(numberGestsSelect.value, 10);
    let mismatch = ``;
    if (numberRooms === 1 && numberGests !== 1) {
      mismatch = `1 комната - для 1 гостя`;
    } else if (numberRooms === 2 && numberGests !== 1 && numberGests !== 2) {
      mismatch = `2 комнаты — для 2 гостей или для 1 гостя`;
    } else if (
      numberRooms === 3 &&
      numberGests !== 1 &&
      numberGests !== 2 &&
      numberGests !== 3
    ) {
      mismatch = `3 комнаты — для 3 гостей, для 2 гостей или для 1 гостя`;
    } else if (numberRooms === 100 && numberGests !== 0) {
      mismatch = `100 комнат — не для гостей`;
    }
    return mismatch;
  };
  // активирование формы
  const formActivation = () => {
    form.classList.remove(`ad-form--disabled`);
    removeDisabledAttribute(formDisabledElements);
    fillAddressInput(window.map.getMainPinPosition());
  };

  // // удаление атрибута disabled
  const removeDisabledAttribute = (items) => {
    for (const element of items) {
      element[items].disabled = false;
    }
  };

  formSubmit.addEventListener(`click`, () => {
    numberGestsSelect.setCustomValidity(compareRoomsAndGests());
    numberGestsSelect.reportValidity();
    inputPriceSelect.setCustomValidity(matchTypesAndPrice());
    inputPriceSelect.reportValidity();
  });
  const inputPriceSelect = form.querySelector(`#price`);
  const typeOfHouseSelect = form.querySelector(`#type`);
  const timeInSelect = form.querySelector(`#timein`);
  const timeOutSelect = form.querySelector(`#timeout`);
  // соотношение минимальной цены за ночь с типом жилья
  const matchTypesAndPrice = () => {
    const typeOfHouse = typeOfHouseSelect.value;
    const inputPrice = parseInt(inputPriceSelect.value, 10);
    let minPrice = ``;
    if (typeOfHouse === `bungalo` && inputPrice < 0) {
      minPrice = `минимальная цена за ночь 0`;
    } else if (typeOfHouse === `flat` && inputPrice < 1000) {
      minPrice = `минимальная цена за ночь 1 000`;
    } else if (typeOfHouse === `house` && inputPrice < 5000) {
      minPrice = `минимальная цена 5 000`;
    } else if (typeOfHouse === `palace` && inputPrice < 10000) {
      minPrice = `минимальная цена 10 000`;
    }
    return minPrice;
  };

  //   изменяю цену за ночь
  const onTypeSelectChange = () => {
    let minPrice = matchTypesAndPrice();
    inputPriceSelect.placeholder = minPrice;
    inputPriceSelect.min = minPrice;
  };

  // изменяю время заезда и выезда
  const onTimeSelectChange = (evt) => {
    if (evt.target === timeInSelect) {
      timeOutSelect.value = timeInSelect.value;
    } else {
      timeInSelect.value = timeOutSelect.value;
    }
  };

  typeOfHouseSelect.addEventListener(`change`, onTypeSelectChange);
  timeInSelect.addEventListener(`change`, onTimeSelectChange);
  timeOutSelect.addEventListener(`change`, onTimeSelectChange);
  window.form = {
    formActivation
    // removeDisabledAttribute,
  };
})();

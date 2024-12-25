import Swiper from "../../assets/swiper/swiper-bundle.min.mjs";
import StepByStepBlock from "./stepByStepBlock.src.js";
const listItems = document.querySelectorAll("aside ol[hidden] li");
const congratulatoryWindow = document.querySelector("#congratulatory-window");
const specificItems = [
  {
    name: "vat",
    element: document.querySelector('[name="vat"]'),
    function: function() {
      let unmaskedvalue = this.element.inputmask.unmaskedvalue();
      let isValueString = /^[0-9a-zA-Z ]{8,}/.test(unmaskedvalue);
      return isValueString;
    }
  },
  {
    name: "iban",
    element: document.querySelector('[name="iban"]'),
    function: function() {
      let unmaskedvalue = this.element.inputmask.unmaskedvalue();
      return unmaskedvalue.length >= 34;
    }
  },
  {
    name: "iban-confirm",
    element: document.querySelector('[name="iban-confirm"]'),
    function: function() {
      let value = this.element.inputmask.unmaskedvalue();
      let valueOfConfirm = document.querySelector('[name="iban"]').inputmask.unmaskedvalue();
      return value == valueOfConfirm;
    }
  },
  {
    name: "details-files",
    element: document.querySelector('[name="details-files"]'),
    function: function() {
      if (!this.element.files.length) {
        return false;
      }
      let filesArray = Array.from(this.element.files);
      let minFiles = filesArray.length > 0;
      let maxFiles = filesArray.length <= 10;
      let isNotExtensions = filesArray.find(
        (file) => !this.element.accept.includes(file.type.replace("image/", ""))
      );
      let isNotCorrectSize = filesArray.find(
        (file) => (
          // in bytes, 1 000 = ~1kb
          // 10 Megabytes
          file.size < 1e3 || file.size > 1e7
        )
      );
      return minFiles && maxFiles && !isNotCorrectSize && !isNotExtensions;
    }
  }
];
let formBlocks = [];
for (let i = 1; i <= listItems.length; i++) {
  formBlocks.push(
    document.querySelectorAll(
      `swiper-slide:nth-child(${i}) :is(input, select)`
    )
  );
}
new StepByStepBlock({
  swiperInstance: new Swiper("#form-steps", {
    allowTouchMove: false,
    allowSlideNext: false,
    allowSlidePrev: false,
    navigation: {
      nextEl: `fieldset > button`,
      disabledClass: "inactive"
    },
    pagination: {
      el: `#form-steps-pag`,
      clickable: true,
      bulletClass: "bullet",
      bulletActiveClass: "current",
      renderBullet: function(index, className) {
        return '<li class="' + className + '">' + listItems[index].innerHTML + "</li>";
      }
    },
    on: {
      slideNextTransitionEnd: function(swiper) {
        swiper.navigation.nextEl.at(-1).disabled = false;
        swiper.navigation.nextEl.at(-1).ariaDisabled = "false";
      }
    }
  }),
  checkFunctions: {
    0: () => validateFields(formBlocks[0]),
    1: () => validateFields(formBlocks[1]),
    2: () => validateFields(formBlocks[2]),
    3: () => validateFields(formBlocks[3]),
    4: () => validateFields(formBlocks[4]),
    5: () => {
      if (validateFields(formBlocks[5])) {
        congratulatoryWindow.showModal();
      }
    }
  }
});
function validateFields(fields) {
  if (fields instanceof Event) {
    fields = [fields.target];
  }
  for (let formElement of fields) {
    let inSpecificItems = specificItems.find((item) => item.name == formElement.name);
    if (inSpecificItems) {
      var isValid = inSpecificItems.function();
    } else {
      var isValid = formElement.validity.valid;
    }
    if (isValid) {
      formElement.classList.remove("invalid");
      document.querySelector(`[data-for=${formElement.name}]`)?.classList?.remove("visible");
      formElement.removeEventListener("input", validateFields);
      formElement.removeEventListener("change", validateFields);
      continue;
    } else {
      formElement.classList.add("invalid");
      document.querySelector(`mark[data-for=${formElement.name}]`)?.classList?.add("visible");
      if (formElement.tagName == "INPUT") {
        formElement.addEventListener("input", validateFields);
      } else if (formElement.tagName == "SELECT") {
        formElement.addEventListener("change", validateFields);
      }
      return false;
    }
  }
  return true;
}

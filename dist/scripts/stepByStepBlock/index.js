import Swiper from "../../assets/swiper/swiper-bundle.min.mjs";
import StepByStepBlock from "./stepByStepBlock.src.js";
import { validatorOfForm } from "../../assets/justValidate/index.js";
const COUNT_OF_BLOCKS = 6;
const listItems = document.querySelectorAll("aside ol[hidden] li");
const congratulatoryWindow = document.querySelector("#congratulatory-window");
let formBlocks = [];
for (let i = 0; i < COUNT_OF_BLOCKS; i++) {
  formBlocks[i] = document.querySelectorAll(
    `swiper-slide:nth-child(${i + 1}) :is(input, select)`
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
    5: async () => {
      if (await validateFields(formBlocks[5])) {
        congratulatoryWindow.showModal();
      }
    }
  }
});
async function validateFields(fields) {
  for (let formElement of fields) {
    if (await validatorOfForm.revalidateField(`[name="${formElement.name}"]`))
      continue;
    else
      return false;
  }
  return true;
}

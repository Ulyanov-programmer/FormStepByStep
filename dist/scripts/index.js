import Inputmask from "../assets/inputmask/inputmask.es6.js";
new Inputmask({
  mask: "9",
  repeat: 10
}).mask(document.querySelector('input[name="zip"]'));
new Inputmask({
  mask: "AA[*]{8,13}",
  definitions: {
    "*": {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  }
}).mask(document.querySelector('input[name="vat"]'));
new Inputmask({
  mask: "AA99[*]{30}",
  definitions: {
    "*": {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  }
}).mask(document.querySelector('input[name="iban"]'));
new Inputmask({
  mask: "AA99[*]{30}",
  definitions: {
    "*": {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  }
}).mask(document.querySelector('input[name="iban-confirm"]'));

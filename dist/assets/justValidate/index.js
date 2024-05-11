/*
  https://just-validate.dev/docs/intro
  https://robinherbots.github.io/Inputmask/#/documentation
*/

import './just-validate.production.min.js'
import Inputmask from "../inputmask/inputmask.es6.js"

const vatNumberInput = document.querySelector('[name="vat"]')
const ibanInput = document.querySelector('[name="iban"]')


new Inputmask({
  mask: "9",
  repeat: 10,
}).mask(document.querySelector('input[name="zip"]'))

new Inputmask({
  mask: "+[9]{11,16}",
}).mask(document.querySelector('input[name="phone"]'))

new Inputmask({
  mask: "AA[*]{8,13}",
  definitions: {
    '*': {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  },
}).mask(document.querySelector('input[name="vat"]'))

new Inputmask({
  mask: "AA99[*]{30}",
  definitions: {
    '*': {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  },
}).mask(document.querySelector('input[name="iban"]'))

new Inputmask({
  mask: "[*]{34}",
  definitions: {
    '*': {
      validator: "[0-9A-Za-z]",
      casing: "upper"
    }
  },
}).mask(document.querySelector('input[name="iban-confirm"]'))



export let validatorOfForm = new JustValidate('#main-form', {
  errorFieldCssClass: 'invalid',

  focusInvalidField: true,
  errorLabelStyle: { display: 'none', }
})
  .onSuccess((e) => {
    // ? Use the code below if you send data through a particular backend system.
    // e.preventDefault()
    // submitRequestForm()
  })

  // First block
  .addField('[name="business-address"]', [
    {
      rule: 'required',
      errorMessage: 'Choose your business address',
    }
  ])
  .addField('[name="type"]', [
    {
      rule: 'required',
      errorMessage: 'Choose your type of business',
    }
  ])
  .addField('[name="address-line-1"]',
    [
      {
        rule: 'required',
      },
    ]
  )
  .addField('[name="address-line-2"]', [
    {
      rule: 'minLength',
      value: 0,
    },
  ])
  .addField('[name="city"]', [
    {
      rule: 'minLength',
      value: 0,
    },
  ])
  .addField('[name="zip"]', [
    {
      rule: 'function',
      validator: (str) => {
        return /^[0-9]{10}/.test(str)
      },
      errorMessage: 'Invalid ZIP code',
    },
  ], {
    errorLabelStyle: { display: 'block', }
  })
  // Second block
  .addField('[name="first-name"]',
    [
      {
        rule: 'required',
      }
    ]
  )
  .addField('[name="last-name"]',
    [
      {
        rule: 'required',
      }
    ]
  )
  .addField('[name="email"]', [
    {
      rule: 'email',
      errorMessage: 'Invalid e-mail',
    },
    {
      rule: 'required',
      errorMessage: 'E-mail is required',
    }
  ])
  .addField('[name="phone"]', [
    {
      rule: 'function',
      validator: () => {
        let phoneUnmaskedValue = document.querySelector('[name="phone"]').inputmask.unmaskedvalue()
        let v = Number(phoneUnmaskedValue) && phoneUnmaskedValue.length >= 11
        return v
      },
      errorMessage: 'Invalid phone number',
    },
  ])
  // Third block
  .addField('[name="vat"]', [
    {
      rule: 'function',
      validator: () => {
        let unmaskedvalue = vatNumberInput.inputmask.unmaskedvalue()
        let isValueString = /^[0-9a-zA-Z ]/.test(unmaskedvalue)

        if (unmaskedvalue.length >= 8 && isValueString) {
          vatNumberInput.classList.remove('invalid')
          return true
        }
        else {
          return false
        }
      },
      errorMessage: 'Invalid VAT number',
    },
  ])
  .addField('[name="industry"]', [
    {
      rule: 'required',
    }
  ])
  .addField('[name="site"]',
    [
      {
        rule: 'required',
      }
    ]
  )
  // Fourth block
  .addField('[name="currency"]', [
    {
      rule: 'required',
    }
  ])
  .addField('[name="bank-country"]', [
    {
      rule: 'required',
    }
  ])
  .addField('[name="iban"]', [
    {
      rule: 'function',
      validator: () => {
        let unmaskedvalue = ibanInput.inputmask.unmaskedvalue()

        if (unmaskedvalue.length >= 34) {
          ibanInput.classList.remove('invalid')
          return true
        }
        else {
          return false
        }
      },
    },
    {
      rule: 'required',
    }
  ])
  .addField('[name="iban-confirm"]', [
    {
      rule: 'function',
      validator: () => {
        let unmaskedvalue = ibanInput.inputmask.unmaskedvalue()
        let unmaskedvalueOfConfirm = document.querySelector('[name="iban-confirm"]')
          .inputmask.unmaskedvalue()

        if (unmaskedvalue != unmaskedvalueOfConfirm) {
          return false
        }

        return true
      },
      errorMessage: 'Repeat IBAN correctly',
    },
    {
      rule: 'required',
    }
  ],
    {
      errorLabelStyle: { display: 'block', }
    }
  )
  // Sixth block
  .addField('[name="details-files"]', [
    {
      rule: 'minFilesCount',
      value: 1,
    },
    {
      rule: 'maxFilesCount',
      value: 10,
    },
    {
      rule: 'files',
      value: {
        files: {
          extensions: ['jpeg', 'jpg', 'png'],
          // in bytes, 1 000 = ~1kb
          minSize: 1000,
          // 100 Megabytes
          maxSize: 100000000,
        },
      },
      errorMessage: 'error',
    }
  ])


/* ? HINTS
  .addField('[name="inputName"]', [

  ])

  {
    rule: 'required',
    errorMessage: 'error',
  },
  {
    rule: 'minLength',
    value: 3,
    errorMessage: 'error',
  },
  {
    rule: 'maxLength',
    value: 30,
    errorMessage: 'error',
  },
  {
    rule: 'email',
    errorMessage: 'error',
  },

  ? Write below the selector of CONTAINER with radio/checkbox inputs.
  .addRequiredGroup(
    '.selector',
    'Message'
  )

  ? only LETTERS and NUMBERS, RU and EN, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      // ru: [а-яА-ЯёЁ ]
      // en: [a-zA-Z ]
      return /^[а-яА-ЯёЁa-zA-Z ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only LETTERS, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      return /^[a-zA-Z() ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only CAPITAL LETTERS, with spaces.
  {
    rule: 'function',
    validator: (str) => {
      return /^[A-Z() ]+$/.test(str)
    },
    errorMessage: 'error',
  },

  ? only NUMBERS with min count.
  {
    rule: 'function',
    validator: (str) => {
      return /^[0-9]{countOfNumbers}/.test(str)
    },
    errorMessage: 'error',
  },

  ? your validator
  {
    rule: 'function',
    validator: () => {
      return true
    },
    errorMessage: 'error',
  },

  ? Checking for a number
  {
    rule: 'function',
    validator: () => {
      ? If you use inputmask...
      let phoneUnmaskedValue = telInputSelector.inputmask.unmaskedvalue()
      return Number(phoneUnmaskedValue) && phoneUnmaskedValue.length > 9
    },
    errorMessage: 'error',
  },

  ? File input validation
  {
    rule: 'files',
    files: {
      extensions: ['.jpg', 'png'],
      types: ['image/jpeg', 'image/png'],
      // in bytes, 1 000 = ~1kb
      minSize: 1000,
      maxSize: 25000,
    },
    errorMessage: 'error',
  }

  ? Tooltips displayed instead of regular error labels.
  tooltip: {
    position: 'left' | 'top' | 'right' | 'bottom',
  },
*/
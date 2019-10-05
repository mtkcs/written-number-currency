# WrittenNumberCurrency
<a href="https://img.shields.io/travis/mtkcs/written-number-currency?style=plastic">
    <img src="https://img.shields.io/travis/mtkcs/written-number-currency?style=plastic">
</a>
<a href="https://img.shields.io/npm/v/@mtkcs/written-number-currency?style=plastic">
    <img src="https://img.shields.io/npm/v/@mtkcs/written-number-currency?style=plastic">
</a>
<a href="https://img.shields.io/bundlephobia/minzip/@mtkcs/written-number-currency?style=plastic">
    <img src="https://img.shields.io/bundlephobia/minzip/@mtkcs/written-number-currency?style=plastic" >
</a>


# Installation
```
npm i @mtkcs/written-number-currency
```

# Usage
Under the hood **written-number-currency** uses the **written-number** library to convert number to words.

```javascript
const wnc = require('@mtkcs/written-number-currency');

// There are only 2 presets for the moment. You can create your own and submit them
// if you want.
// Import a preset that corresponds to your language-currency combination.
const frDinarPresets = require('@mtkcs/written-number-currency/lib/presets/fr-dinar');

// locales for your language. Check the written-number library for all available locales:
const fr = require('written-number/lib/i18n/fr.json');

// create an instance
const instance = wnc({lang: fr, ...frDinarPresets});

// If we want to get the string representation of 1234 Dinar and 23 millimes (1234.023)
// amount = 1234: amount in dollars (euros, dinars, ...)
// precision = 23: amount in cents (centimes, millimes, ...)
const result = instance({amount: 1234, precision: 23});

console.log(result);
// => mille deux cent trente-quatre dinars et vingt-trois millimes
```

## WrittenNumberCurrency
The arguments are:
- `lang`: **Object**|*required*. A `written-number` valid language object.
- `linker`: **String**|*optional*. The word that links between the **amount** and the **precision**
- `amountFormatter`: **Function**|*required* if `amount` is provided. Function that accepts an amount
 an returns the correct grammatical form of the base currency.
- `precisionFormatter`: **Function**|*required* if `precision` is provided. Function that accepts an amount
 an returns the correct grammatical form of the small currency.
## Presets
Presets are objects that should contain 3 keys:
`linker`
`amountFormatter`
`precisionFormatter`
##### Example:
```javascript
// presets/en-dollar.js
const preset = {
  linker: 'and',
  amountFormatter(amount) {
    if (amount === 1) return 'dollar';
    return 'dollars';
  },
  precisionFormatter(amount) {
    if (amount === 1) return 'cent';
    return 'cents';
  },
}
```
## Instance returned by WrittenNumberCurrency 
The arguments are:
- `amount`: **Positive Integer**|*required* if `precision` was **not** provided. The base currency of your choice, ex: dollar, euro, dinar...
- `precision`: **Positive Integer**|*required* if `amount` was **not** provided. The small currency of your choice, ex: cent, millime, centime...

# Licence
MIT

# WrittenNumberCurrency

# Installation
```
npm i @mtkcs/written-number-currency@0.3.0
```

# Usage
Under the hood **written-number-currency** uses the **written-number** library to convert number to words.

```javascript
const wnc = require('@mtkcs/written-number-currency');

// Import a preset that corresponds for your language-currency combination:
// There are only 2 presets for the moment. You can create your own and submit them
// if you want.
const frDinarPresets = require('@mtkcs/written-number-currency/lib/presets/fr-dinar');

// locales for your language. Check the written-number library for all available locales:
const fr = require('written-number/lib/i18n/fr.json');

// create an instance
const instance = wnc({lang: fr, ...frDinarPresets})

// If we want to get the string representation of 1234 Dinar and 23 millimes (1234.023)
// baseUnitAmount: amount in dollars (euros, dinars, ...)
// smallUnitAmont: amount in cents (centimes, millimes, ...)
// at least one of the two should be provided.
const result = instance({baseUnitAmount: 1234, smallUnitAmount: 23})

console.log(result);
// => mille deux cent trente-quatre dinars et vingt-trois millimes
```

## Presets
Presets are objects that contain 3 keys:
- `linker`: *optional*. The word that links between the **baseUnitAmount** and the **smallUnitAmount**
- `baseUnitFormatter`: *required* if baseUnitAmount is provided. Function that accepts an amount
 an returns the correct grammatical form of the base currency.
- `smallUnitFormatter`: *required* if smallUnitAmount is provided. Function that accepts an amount
 an returns the correct grammatical form of the small currency.
##### Example:
```javascript
// presets/en-dollar.js
const preset = {
  linker: 'and',
  baseUnitFormatter(amount) {
    if (amount === 1) return 'dollar';
    return 'dollars';
  },
  smallUnitFormatter(amount) {
    if (amount === 1) return 'cent';
    return 'cents';
  },
}
```
# Licence
MIT

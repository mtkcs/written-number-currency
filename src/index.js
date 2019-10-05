const invariant = require("invariant");
const writtenNumber = require("written-number/lib/standalone");

function writtenNumberCurrency(config = {}) {
  const {
    lang,
    amount: amountArg,
    precision: precisionArg,
    amountFormatter,
    linker = "",
    precisionFormatter
  } = config || {};
  invariant(lang, `config.lang is required`);

  writtenNumber.defaults.lang = lang;

  return function({
    amount: amountArg,
    precision: precisionArg
  } = {}) {
    let amount, precision;

    if (amountArg == null && precisionArg != null) {
      precision = prepareNumber(precisionArg, "precision");
      validateFunction(precisionFormatter, "precisionFormatter");
    } else if (amountArg != null && precisionArg == null) {
      amount = prepareNumber(amountArg, "amount");
      validateFunction(amountFormatter, "amountFormatter");
    } else if (amountArg == null && precisionArg == null) {
      invariant(false, "Please provide a amount or a precision");
    } else {
      amount = prepareNumber(amountArg, "amount");
      precision = prepareNumber(precisionArg, "precision");
      validateFunction(amountFormatter, "amountFormatter");
      validateFunction(precisionFormatter, "precisionFormatter");
    }

    if (amount == null) {
      return format(precision, precisionFormatter);
    }
    if (precision == null) {
      return format(amount, amountFormatter);
    }

    return link(
      format(amount, amountFormatter),
      format(precision, precisionFormatter),
      linker
    );
  };
}

function link(left, right, linker) {
  return linker ? `${left} ${linker} ${right}` : `${left} ${right}`;
}

function format(amount, formatter) {
  return writtenNumber(amount) + " " + formatter(amount);
}

function validateFunction(n, name) {
  if (typeof n !== "function") {
    invariant(false, `config.${name} should be a valid function`);
  }
}
function prepareNumber(n, name) {
  n = Number(n);
  if (Number.isNaN(n)) {
    invariant(false, `config.${name} should be valid number`);
  }

  if (typeof n === "number" && n < 0) {
    invariant(false, `config.${name} should be greater than or equal to zero`);
  }

  return Math.round(n);
}

module.exports = writtenNumberCurrency;

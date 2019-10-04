import invariant from "invariant";
import writtenNumber from "written-number/lib/standalone";

export function writtenNumberCurrency(config = {}) {
  const {
    lang,
    baseUnitAmount: baseUnitAmountArg,
    smallUnitAmount: smallUnitAmountArg,
    baseUnitFormatter,
    linker = "",
    smallUnitFormatter
  } = config || {};
  invariant(lang, `config.lang is required`);

  writtenNumber.defaults.lang = lang;

  return function({
    baseUnitAmount: baseUnitAmountArg,
    smallUnitAmount: smallUnitAmountArg
  } = {}) {
    let baseUnitAmount, smallUnitAmount;

    if (baseUnitAmountArg == null && smallUnitAmountArg != null) {
      smallUnitAmount = prepareNumber(smallUnitAmountArg, "smallUnitAmount");
      validateFunction(smallUnitFormatter, "smallUnitFormatter");
    } else if (baseUnitAmountArg != null && smallUnitAmountArg == null) {
      baseUnitAmount = prepareNumber(baseUnitAmountArg, "baseUnitAmount");
      validateFunction(baseUnitFormatter, "baseUnitFormatter");
    } else if (baseUnitAmountArg == null && smallUnitAmountArg == null) {
      invariant("Please provide a baseUnitAmount or a smallUnitAmount");
    } else {
      baseUnitAmount = prepareNumber(baseUnitAmountArg, "baseUnitAmount");
      smallUnitAmount = prepareNumber(smallUnitAmountArg, "smallUnitAmount");
      validateFunction(baseUnitFormatter, "baseUnitFormatter");
      validateFunction(smallUnitFormatter, "smallUnitFormatter");
    }

    if (baseUnitAmount == null) {
      return format(smallUnitAmount, smallUnitFormatter);
    }
    if (smallUnitAmount == null) {
      return format(baseUnitAmount, baseUnitFormatter);
    }

    return link(
      format(baseUnitAmount, baseUnitFormatter),
      format(smallUnitAmount, smallUnitFormatter),
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
    invariant(`config.${name} should be a valid function`);
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

export default writtenNumberCurrency;

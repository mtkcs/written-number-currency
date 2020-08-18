const { getLastTwoDigits } = require("./utils");

const preset = {
  linker: "و",
  amountFormatter(amount) {
    return format(amount, "يورو", "يورو");
  },
  precisionFormatter(amount) {
    return format(amount, "سنتات", "سنت");
  }
};

function format(amount, c1, c2) {
  const lastTwoDigits = getLastTwoDigits(amount);
  if (
    ["10", "09", "08", "07", "06", "05", "04", "03"].indexOf(lastTwoDigits) !==
    -1
  ) {
    return c1;
  }
  return c2;
}

module.exports = preset;

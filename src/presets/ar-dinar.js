const { getLastTwoDigits } = require("./utils");

const preset = {
  linker: "و",
  amountFormatter(amount) {
    return format(amount, "دنانير", "دينار");
  },
  precisionFormatter(amount) {
    return format(amount, "مليمات", "مليم");
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

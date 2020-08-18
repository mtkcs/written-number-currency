var preset = {
  linker: "and",
  amountFormatter(amount) {
    return format(amount, "dinar", "dinars");
  },
  precisionFormatter(amount) {
    return format(amount, "millime", "millimes");
  }
};

function format(amount, c1, c2) {
  if (amount === 1) {
    return c1;
  }
  return c2;
}

module.exports = preset;

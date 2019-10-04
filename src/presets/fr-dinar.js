var preset = {
  linker: "et",
  baseUnitFormatter(amount) {
    return format(amount, "dinar", "dinars");
  },
  smallUnitFormatter(amount) {
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

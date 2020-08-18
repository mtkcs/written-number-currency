var preset = {
  linker: "et",
  amountFormatter(amount) {
    return format(amount, "euro", "euros");
  },
  precisionFormatter(amount) {
    return format(amount, "centime", "centimes");
  }
};

function format(amount, c1, c2) {
  if (amount === 1) {
    return c1;
  }
  return c2;
}

module.exports = preset;

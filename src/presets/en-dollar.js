var preset = {
  linker: "and",
  amountFormatter(amount) {
    return format(amount, "dollar", "dollars");
  },
  precisionFormatter(amount) {
    return format(amount, "cent", "cents");
  }
};

function format(amount, c1, c2) {
  if (amount === 1) {
    return c1;
  }
  return c2;
}

module.exports = preset;

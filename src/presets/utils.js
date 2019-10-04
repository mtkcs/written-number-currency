function getLastTwoDigits(number) {
  const str = String(number);
  const { length } = str;
  const result = str.slice(length - 2, length);
  if (result.length === 1) {
    return `0${result}`;
  }
  return result;
}
module.exports.getLastTwoDigits = getLastTwoDigits;

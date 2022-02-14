module.exports = function checkDate(date) {
  console.log(date);
  const auxDate = new Date(date);
  const number = auxDate.getTime();
  if (number) {
    if (number >= 946684800000 && number <= 2556143999000) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

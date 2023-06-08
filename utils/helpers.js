function formatDate(date) {
  return date.toString();
}

function validator(val) {
  const regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
  return regex.test(val);
}
const emailValidator = [validator, 'Error, invalid email address'];

module.exports = { formatDate, emailValidator };
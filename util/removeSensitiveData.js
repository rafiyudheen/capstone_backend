function removeSensitiveData(userData) {
  let modifiedData = { ...userData._doc };
  delete modifiedData.PASSWORD;
  delete modifiedData.USER_TYPE;
  return modifiedData;
}

module.exports = removeSensitiveData;

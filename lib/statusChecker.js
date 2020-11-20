module.exports.checkStatus = function checkStatus(data) {
  for (var item of data) {
    if (item.status == 400 || item.status == 404 || item.status == 'UNKNOWN') {
      return 1;
    }
  }
  return 0;
};

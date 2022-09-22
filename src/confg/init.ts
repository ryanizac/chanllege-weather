Array.prototype.sortBySize = function sortBySize(key) {
  return this.sort((a, b) => {
    if (a[key] < b[key]) return -1;
    if (a[key] > b[key]) return 1;
    return 0;
  });
};

Array.prototype.sortByBoolean = function sortByBoolean(key) {
  return this.sort((a, b) => {
    if (a[key] && !b[key]) return -1;
    if (!a[key] && b[key]) return 1;
    return 0;
  });
};

export const getData = (key) => {
  let item = window.localStorage.getItem(key);

  return item ? JSON.parse(item) : null;
};

export const saveData = (key, data) => {
  window.localStorage.setItem(key, JSON.stringify(data));
};
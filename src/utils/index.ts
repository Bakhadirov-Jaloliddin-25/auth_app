export const saveStorage = (key: string, value: any) => {
  if (typeof value === "string") {
    localStorage.setItem(key, value);
  } else {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const getStorage = (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};
export const clearStorage = (key: string) => {
  localStorage.removeItem(key);
};

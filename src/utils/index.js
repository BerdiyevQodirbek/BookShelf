export const getUserKey = () => {
  const userData = localStorage.getItem("secretKey");
  if (userData) {
    return JSON.parse(userData);
  }
  return null;
};

export const setUserKey = (key) => {
  localStorage.setItem("secretKey", JSON?.stringify(key));
};

export const removeUserKey = (key) => {
  localStorage.removeItem("secretKey");
};

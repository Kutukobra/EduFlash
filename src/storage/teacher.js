function setUserData(id, username) {
  localStorage.setItem("userId", id);
  localStorage.setItem("username", username);
}

function getUserData() {
  return {
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
  };
}

export { setUserData, getUserData };

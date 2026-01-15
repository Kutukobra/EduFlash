function setStudentData(username) {
  sessionStorage.setItem("studentUsername", username);
}

function getStudentData() {
  return {
    username: sessionStorage.getItem("studentUsername"),
  };
}

export { setStudentData, getStudentData };

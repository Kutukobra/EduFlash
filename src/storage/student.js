function setStudentData(username, roomId, roomName) {
  sessionStorage.setItem("studentUsername", username);
  sessionStorage.setItem("roomId", roomId);
  sessionStorage.setItem("roomName", roomName);
}

function getStudentData() {
  return {
    username: sessionStorage.getItem("studentUsername"),
    roomId: sessionStorage.getItem("roomId"),
    roomName: sessionStorage.getItem("roomName"),
  };
}

export { setStudentData, getStudentData };

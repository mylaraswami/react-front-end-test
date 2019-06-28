const storage = {
  token: "userToken",
  userInfo: "userInfo",
  userName: "abc",
  password: "123"
};

class User {

  setToken = token => {
    localStorage.setItem("token", token);
  };

  getDataKey = key => {
    return localStorage.getItem(key);
  };

  setUserInfo = email => {
    localStorage.setItem('email', email);
  };

  isLogin() {
    return localStorage.getItem("token")
      ? true
      : false;
  }

  loginAttempt = (username, password) => {
    if (storage.userName === username && storage.password === password) {
      return true;
    }
    return false;
  };

  clearData() {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  }
}

export default new User();

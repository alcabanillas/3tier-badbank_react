const API_URL = process.env.REACT_APP_API_URL

const addUser = (userInfo) => {
  debugger
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": userInfo.name,
    "email": userInfo.email,
    "password": userInfo.password
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/users/`, requestOptions)
      .then((response) => {
        if (!response.ok) {
          reject(response.text());
        } else {
          resolve(response.json());
        }
      })
      .catch((err) => {
        reject(err);
      })
  );
};

const getAllData = () => {
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/account/all`)
      .then((response) => {
        if (!response.ok) {
          response.text().then(msg => reject(msg));
        } else {
          resolve(response.json());
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const deposit = (userInfo) => {
  let options = { method: 'POST'}

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/account/deposit/${userInfo.email}/${userInfo.amount}`, options)
      .then((response) => {
        if (!response.ok) {
          response.text().then((msg) => reject(msg));
        } else {
          resolve(response.json());
        }
      })
      .catch((err) => reject(err))
  );
}

// do withDraw operation
const withDraw = (userInfo) => {
  let options = { method: 'POST'}
  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/account/withdraw/${userInfo.email}/${userInfo.amount}`, options)
      .then((response) => {
        if (!response.ok) {
          response.text().then((msg) => reject(msg));
        } else {
          resolve(response.json());
        }
      })
      .catch((err) => reject(err))
  )
}

// get user balance
const getUserBalance = async ( userInfo) => {
  const idToken = await userInfo.getIdToken()
  var options = {
    method: 'GET',
    headers: {
      'Authorization' : idToken
    }
  }
  debugger

  return new Promise((resolve, reject) => 
    fetch(`${API_URL}/users/${userInfo.email}/balance/`, options)
    .then((response) => {
      if (!response.ok) {
        response.text().then((msg) => reject(msg));
      } else {
        resolve(response.json());
      }
    })
    .catch((err) => reject(err))
  )
}

module.exports = { getAllData, addUser, deposit, withDraw, getUserBalance };

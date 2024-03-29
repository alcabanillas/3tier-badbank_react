const API_URL = process.env.REACT_APP_API_URL

const addUser = (userInfo) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    "name": userInfo.name,
    "email": userInfo.email,
    "password": userInfo.password,
    "provider": userInfo.provider
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

const isEmailAvailable = (email) => {
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/users/${email}/`, requestOptions)
      .then((response) => {
        if (response.status == 200) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch((err) => {
        reject(err);
      })
  );
};

const getTransactionsByEmail = async (userInfo) => {
  const idToken = await userInfo.getIdToken()
  var options = {
    method: 'GET',
    headers: {
      'Authorization' : idToken
    }
  }
  return new Promise((resolve, reject) => {
    fetch(`${API_URL}/transactions/${userInfo.email}`, options)
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

const doNewTransaction = async (userInfo) => {
  const idToken = await userInfo.user.getIdToken()
  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", idToken)

  var raw = JSON.stringify({
    "amount": userInfo.amount
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  return new Promise((resolve, reject) =>
    fetch(`${API_URL}/transactions/${userInfo.user.email}`, requestOptions)
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

// get user balance
const getUserBalance = async ( userInfo) => {
  const idToken = await userInfo.getIdToken()
  var options = {
    method: 'GET',
    headers: {
      'Authorization' : idToken
    }
  }

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

export default { getTransactionsByEmail, addUser, doNewTransaction, getUserBalance, isEmailAvailable };

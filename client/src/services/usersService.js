const addUser = (userInfo) => {
  return new Promise((resolve, reject) =>
    fetch(
      `/account/create/${userInfo.name}/${userInfo.email}/${userInfo.password}`
    )
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
    fetch('/account/all')
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
    fetch(`/account/deposit/${userInfo.email}/${userInfo.amount}`, options)
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
    fetch(`/account/withdraw/${userInfo.email}/${userInfo.amount}`, options)
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
const getBalance = ( userInfo) => {
  return new Promise((resolve, reject) => 
    fetch(`/account/balance/${userInfo.email}`)
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

export default { getAllData, addUser, deposit, withDraw, getBalance };

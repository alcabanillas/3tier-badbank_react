import { useState, useEffect, useContext } from "react";
import { BankCard } from "../components/bankcard";
import { useToastContext } from "../state/CustomToast";
import apiService from "../services/usersService";
import { AuthContext } from "../state/AppState";

export function AllData() {
  const currentUser = useContext(AuthContext);
  const [data, setData] = useState([]);
  const addToast = useToastContext();

  useEffect(() => {
    if (currentUser == null) return

    //fetch all accounts from API
    apiService.getTransactionsByEmail(currentUser)
      .then((res) => setData(res))
      .catch((err) => {
        setData([]);
        addToast({ text: `Error fetching data: ${err}`, type: "error" });
      });
  }, [currentUser]);

  const getShortDate = (date) => {
    let curDate = new Date(date)
    return `${curDate.toLocaleDateString()}`
  }

  const getShortTime = (date) => {
    let curDate = new Date(date)
    return `${curDate.toLocaleTimeString()}`
  }  

  return (
    <div className="card-container allData">
      <BankCard
        header="All Data"
        txtcolor="black"
        width="50rem"
        body={
          currentUser ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Amount</th>
              </tr>
            </thead>
            <tbody>
              
              {data.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{getShortDate(element.date)}</td>
                    <td>{getShortTime(element.date)}</td>
                    <td>{element.amount}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>) :
          (<div>You must be logged in to use this function</div>)
        }
      ></BankCard>
    </div>
  );
}

import { useState, useEffect } from "react";
import { BankCard } from "../components/bankcard";
import { useToastContext } from "../state/CustomToast";

export function AllData() {
  const [data, setData] = useState([]);
  const addToast = useToastContext();

  useEffect( () => {
    //fetch all accounts from API
    fetch('/account/all')
      .then( (response) => {
        if (response.ok) {
          return response.json()
        }
        else {
          response.text().then( msg => addToast({ text: `Error fetching data: ${msg}`, type: "error" }))
          return [];
        }
      })
      .then ( res => setData(res))
      .catch( (err) => {
        setData([])
        addToast({ text: `Error fetching data: ${err}`, type: "error" })
      })
  }, [])

  return (
    <div className="card-container allData">
      <BankCard
        header="All Data"
        txtcolor="black"
        width="50rem"
        body={
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col">Password</th>
                <th scope="col">Balance</th>
              </tr>
            </thead>
            <tbody>
              {data.map((element, index) => {
                return (
                  <tr key={index}>
                    <td>{element.email}</td>
                    <td>{element.name}</td>
                    <td>{element.password}</td>
                    <td>{element.balance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        }
      ></BankCard>
    </div>
  );
}

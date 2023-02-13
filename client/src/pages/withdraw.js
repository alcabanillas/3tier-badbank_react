import { useContext, useState, useEffect } from "react";
import { UsersContext } from "../state/AppState";
import { useToastContext } from "../state/CustomToast";
import { BankCard } from "../components/bankcard";
import BankForm from "../components/bankform";
import * as yup from "yup";
import apiService from "../services/usersService";

export const WithDraw = () => {
  const { usersState } = useContext(UsersContext);
  const [show, setShow] = useState(true);
  const addToast = useToastContext();

  const [balance, setBalance] = useState(0)

  useEffect( () =>{
    // fetch current balance
    apiService
      .getBalance({email: usersState.currentUser.email})
        .then( res => setBalance(Number(res.balance)))
        .catch( err => addToast({ text : `Error getting balance: ${err}`, type: "error"}))
  }, [])

  const handleSubmit = (data) => {
    apiService.withDraw({ email: usersState.currentUser.email, amount : Number(data.Amount)})
      .then( (result) => {
        setBalance(Number(result.amount))
        setShow(false);
        addToast({ text: "Withdraw successfully done", type: "success" });
      })
      .catch( (errorMessage) =>
        addToast({ text: errorMessage, type: "error" })
      )
  };

  let formFields = [
    { id: "Amount", placeholder: "Enter amount", type: "input" },
  ];

  let initialValues = {
    Amount: "",
  };

  const schema = yup.object().shape({
    Amount: yup
      .number()
      .test("is-decimal", "Amount must be a currency", (value) =>
        value.toString().match(/^-?\d+(\.\d{1,2})?$/g)
      )
      .typeError("Amount must be a valid number")
      .min(0.01, "Amount must be a positive number")
      .required(),
  });

  const clearForm = () => {
    setShow(true);
  };

  const renderNewOperation = () => {
    return (
      <div>
        <div className="mb-3">Your balance has been updated</div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" onClick={() => clearForm()}>
            New operation
          </button>
        </div>
      </div>
    );
  };

  const renderWithDrawForm = () => {
    return (
      <BankForm
        buttonSubmit="WithDraw"
        handle={handleSubmit}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  return (
    <div className="card-container withdraw">
      <BankCard
        txtcolor="black"
        header="WithDraw"
        body={
          usersState.currentUser ? (
            <div>
              <h3 className="col text-center mb-3" id="total">
                Balance ${balance}
              </h3>
              {show ? renderWithDrawForm() : renderNewOperation()}
            </div>
          ) : (
            <div>You must be logged in to use this function</div>
          )
        }
      />
    </div>
  );
};
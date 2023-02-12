import { useContext, useState } from "react";
import { UsersContext } from "../state/AppState";
import { useToastContext } from "../state/CustomToast";
import BankForm from "../components/bankform";
import { BankCard } from "../components/bankcard";

import * as yup from "yup";

export function CreateAccount() {
  const { actions } = useContext(UsersContext);
  const [show, setShow] = useState(true);
  const addToast = useToastContext();

  const handleCreate = (data) => {
    let result;

    actions.addUser({
      name: data.Name,
      email: data.Email,
      password: data.Password,
      balance: 0,
    })
      .then( (res) => {
        console.log('actions.addUser', res)
        result = true;
        setShow(false);
        addToast({ text: "Account successfully created", type: "success" });
        return { result };
      })
      .catch( 
        (error) => {
          error.then( msg => addToast({ text: `Error creating user: ${msg}`, type: "error" }));
          result = false;
          return { result };
      })
  };

  let formFields = [
    { id: "Name", placeholder: "Enter name", type: "input" },
    { id: "Email", placeholder: "Enter email", type: "email" },
    { id: "Password", placeholder: "Enter password", type: "password" },
  ];

  let initialValues = {
    Name: "",
    Password: "",
    Email: "",
  };

  const schema = yup.object().shape({
    Name: yup.string().required(),
    Email: yup.string().email("User must be a valid email").required(),
    Password: yup
      .string()
      .min(8, "Password must have at least 8 chars")
      .required(),
  });

  const clearForm = () => {
    setShow(true);
  };

  const renderCreateAccountForm = () => {
    return (
      <BankForm
        buttonSubmit="Create Account"
        handle={handleCreate}
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  const renderNewAccount = () => {
    return (
      <div className="create-account">
        <h5>Success</h5>
        <div className="mb-3">User account created successfully</div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary" onClick={() => clearForm()} >
            Add another account
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="card-container create-account">
      <BankCard
        txtcolor="black"
        header="Create account"
        body={show ? renderCreateAccountForm() : renderNewAccount()}
      />
    </div>
  );
}

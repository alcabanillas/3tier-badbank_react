import { useContext } from "react";
import { UsersContext } from "../state/AppState";
import { useToastContext} from "../state/CustomToast";
import  BankForm  from "../components/bankform";
import { BankCard } from "../components/bankcard";
import * as yup from "yup";
import { doLogin, doGoogleLogin } from "../services/authService"

export function Login() {
  const { usersState, actions } = useContext(UsersContext);
  const addToast = useToastContext();

  let formFields = [
    { id: "Email", placeholder: "Enter email", type: "email" },
    { id: "Password", placeholder: "Enter password", type: "password" },
  ];

  let initialValues = {
    Email: "",
    Password: "",
  };

  const schema = yup.object().shape({
    Email: yup.string().email('User must be a valid email').required(),
    Password: yup.string().required()
  });

  function handleGoogleLogin() {
    doGoogleLogin()
      .then( msg => {
        debugger
        addToast({text: `User ${msg.user.email} logged in`, type: 'success'})
        actions.login( msg.user)
      })
      .catch( errorMessage =>{ 
        debugger
        addToast({text: 'Error: ' + errorMessage, type: 'error'}) 
      })
  }

  function handleLogin(data) {
    doLogin({ email: data.Email, password : data.Password })
      .then( msg => { 
        addToast({text: `User ${msg.user.email} logged in`, type: 'success'})
        actions.login( msg.user)
      })
      .catch( errorMessage =>{ addToast({text: 'Error: ' + errorMessage, type: 'error'}) })
  }

  const additionalButtonObj = { 
    text: <span class="bi bi-google"> Log in with google</span>,
    handler: () => handleGoogleLogin()  
  }

  const renderLoginForm = () => {
    return (
      <BankForm
        buttonSubmit={"Login"}
        handle={handleLogin}
        additionalButton = { additionalButtonObj }
        fields={formFields}
        initialData={initialValues}
        schema={schema}
      />
    );
  };

  const renderLogoutForm = () => {
    return (
      <div className="card-container logout">
        <h5>User logged in</h5>
        <div>Welcome {usersState.currentUser.email}</div>
      </div>
    );
  };

  return (
    <div className="card-container login">
      <BankCard
        width="30rem"
        txtcolor="black"
        header="Login"
        body={!usersState.currentUser ? 
            renderLoginForm() : 
            renderLogoutForm()
        }/>
    </div>
  );
}

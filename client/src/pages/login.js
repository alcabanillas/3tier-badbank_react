import { useContext } from "react";
import { AuthContext } from "../state/AppState";
import { useToastContext } from "../state/CustomToast";
import BankForm from "../components/bankform";
import { BankCard } from "../components/bankcard";
import * as yup from "yup";
import { doLogin, doGoogleLogin } from "../services/authService";
import apiService from "../services/usersService";

export function Login() {
  const currentUser = useContext(AuthContext);
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
    Email: yup.string().email("User must be a valid email").required(),
    Password: yup.string().required(),
  });

  function handleGoogleLogin() {
    doGoogleLogin()
      .then(async (msg) => {
        let isNewUser = apiService.isEmailAvailable(msg.user.email);
        if (isNewUser == true) {
          apiService.addUser({
            name: msg.user.displayName,
            email: msg.user.email,
            password: "",
            provider: "google",
          });
        }
        addToast({ text: `User ${msg.user.email} logged in`, type: "success" });
      })
      .catch((errorMessage) => {
        addToast({ text: "Error: " + errorMessage, type: "error" });
      });
  }

  function handleLogin(data) {
    doLogin({ email: data.Email, password: data.Password })
      .then((msg) => {
        addToast({ text: `User ${msg.user.email} logged in`, type: "success" });
      })
      .catch((errorMessage) => {
        addToast({ text: "Error: " + errorMessage, type: "error" });
      });
  }

  const additionalButtonObj = {
    text: <span className="bi bi-google"> Log in with google</span>,
    handler: () => handleGoogleLogin(),
  };

  const renderLoginForm = () => {
    return (
      <BankForm
        buttonSubmit={"Login"}
        handle={handleLogin}
        additionalButton={additionalButtonObj}
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
        <div>Welcome {currentUser.email}</div>
      </div>
    );
  };

  return (
    <div className="card-container login">
      <BankCard
        width="30rem"
        txtcolor="black"
        header="Login"
        body={!currentUser ? renderLoginForm() : renderLogoutForm()}
      />
    </div>
  );
}

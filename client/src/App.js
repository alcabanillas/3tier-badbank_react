import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./routes/navbar";
import { Home } from "./pages/home";
import { CreateAccount } from "./pages/createaccount";
import { Login } from "./pages/login";
import { Deposit } from "./pages/deposit";
import { WithDraw } from "./pages/withdraw";
import { AllData } from "./pages/alldata";
import { Footer } from "./routes/footer";


import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import { AuthContextProvider } from "./state/AppState";
import { ToastContextProvider } from "./state/CustomToast";

function App() {
  return (
    <AuthContextProvider>
      <Router>
        <NavBar />
        <ToastContextProvider>
        <div className="container-fluid center">
            <Routes>
              <Route path="/" exact element={<Home />}></Route>
              <Route path="createaccount" element={<CreateAccount />}></Route>
              <Route path="login" element={<Login />}></Route>
              <Route path="deposit" element={<Deposit />}></Route>
              <Route path="withdraw" element={<WithDraw />}></Route>
              <Route path="alldata" element={<AllData />}></Route>
            </Routes>
        </div>
        </ToastContextProvider>
        <Footer></Footer>
      </Router>
    </AuthContextProvider>
  );
}

export default App;

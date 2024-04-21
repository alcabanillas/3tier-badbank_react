import "./App.css";
import { Route, HashRouter as Router, Routes } from "react-router-dom";
import { NavBar, Footer } from "./routes";
import { Home, CreateAccount, Login, Deposit, WithDraw, AllData } from "./pages";
import { AuthContextProvider, ToastContextProvider } from "./state";

import "bootswatch/dist/flatly/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";

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

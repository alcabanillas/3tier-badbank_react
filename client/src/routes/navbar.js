import { useContext } from "react";
import { AuthContext } from "../state/AppState";
import { Navigate, NavLink } from "react-router-dom";
import { CustomTooltip } from "../components/customtooltip";
import { doLogout } from "../services/authService";


export function NavBar() {
  const currentUser = useContext(AuthContext);

  const isUserLoggedIn = currentUser ? "" : "disabled";

  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-dark bg-primary" >
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          BadBank
        </NavLink>
        <button
          className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" 
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
          <li className="nav-item">
              <CustomTooltip text="Home" tooltipId="home">
                <NavLink className="nav-link" to="/" end>
                  Home
                </NavLink>
              </CustomTooltip>
            </li>
            <li className="nav-item">
              <CustomTooltip text="Create new account" tooltipId="createAccount">
                <NavLink className="nav-link" to="/CreateAccount/">
                  Create Account
                </NavLink>
              </CustomTooltip>
            </li>
              <li className="nav-item">
                <CustomTooltip text="Deposit" tooltipId="deposit">
                  <NavLink className={`nav-link ${isUserLoggedIn}` } to="/deposit">
                    Deposit
                  </NavLink>
                </CustomTooltip>
              </li>
              <li className="nav-item">
                <CustomTooltip text="Withdraw" tooltipId="withDraw">
                  <NavLink className={`nav-link ${isUserLoggedIn}`} to="/withdraw">
                    WithDraw
                  </NavLink>
                </CustomTooltip>
              </li>

            <li className="nav-item">
              <CustomTooltip text="All data" tooltipId="allData">
                <NavLink className={`nav-link ${isUserLoggedIn}`} to="/allData">
                  AllData
                </NavLink>
              </CustomTooltip>
            </li>
            <li className="nav-item">
            {currentUser === null ? (
                <CustomTooltip text="Log in" tooltipId="login">
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </CustomTooltip>
            ) : ( 
              <CustomTooltip text="Log out" tooltipId="logout">
              <NavLink className="nav-link" to="/" end onClick={(e) => { doLogout()}}>
                Logout
              </NavLink>
              </CustomTooltip>
            )}
            </li>            
          </ul>
        </div>
      </div>
    </nav>
  );
}

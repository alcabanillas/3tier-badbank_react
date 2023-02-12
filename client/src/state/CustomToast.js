import { useState, createContext, useContext } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

export const TOAST_PROPERTIES = [
  {
    id: Math.floor(Math.random() * 101 + 1),
    type: "success",
    background: "success",
    icon: "bi bi-check-circle",
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    type: "error",
    background: "danger",
    icon: "bi bi-exclamation-circle",
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    type: "warning",
    background: "warning",
    icon: "bi bi-exclamation-triangle",
  },
  {
    id: Math.floor(Math.random() * 101 + 1),
    type: "info",
    backgroundColor: "secondary",
    icon: "bi bi-info-circle",
  },
];

const ToastContext = createContext();

export default ToastContext;

export function ToastContextProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = function ({ type, header, text }) {
    const toastProperties = TOAST_PROPERTIES.find(
      (toast) => toast.type.toLowerCase() === type
    );

    setToasts((toasts) => [
      ...toasts,
      { ...toastProperties, show : true, header, text },
    ]);
  };

  const toggleShow = (i) => {
    let newToasts = toasts.filter((elem, index) => index !== i);
    setToasts(newToasts);
  };

  return (
    <ToastContext.Provider value={addToast}>
      {children}
        <ToastContainer position="top-end" className="mt-4">
          {toasts.map((elem, index) => {
            return (
              <Toast
                key={index}
                bg={elem.background}
                show={elem.show}
                role="alert"
                onClose={() => toggleShow(index)}
                delay={3000}
                autohide
              >
                <Toast.Header>
                  <i className={elem.icon}></i>
                  &nbsp;
                  <strong className="me-auto">Bad bank</strong>
                </Toast.Header>
                <Toast.Body>{elem.text}</Toast.Body>
              </Toast>
            );
          })}
        </ToastContainer>

    </ToastContext.Provider>
  );
}

export function useToastContext() {
  return useContext(ToastContext);
}

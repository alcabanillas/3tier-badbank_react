import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { InputGroup, Col } from "react-bootstrap";
import {useState} from "react"

function BankForm({ buttonSubmit, handle, fields, initialData, schema, additionalButton }) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  return (
    <Formik
      validationSchema={schema}
      onSubmit={handle}
      initialValues={initialData}
    >
      {({ handleSubmit, handleChange, touched, isValid, errors, dirty }) => (
        <Form className="mb-3" noValidate onSubmit={handleSubmit}>
          {fields.map((elem, index) => {
            let isPassword = (elem.type === 'password')

            return (
              <Form.Group className="mb-3" key={index}>
                <Form.Label htmlFor={elem.id}>{elem.id}</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type={isPassword ? (passwordShown ? "text" : "password") : elem.type}
                    key={index}
                    id={elem.id}
                    onChange={handleChange}
                    placeholder={elem.placeholder}
                    isValid={touched[elem.id] && !errors[elem.id]}
                    isInvalid={!!errors[elem.id]}
                  />
                  {isPassword && <Button>
                  <i className={ passwordShown ? "bi bi-eye" : "bi bi-eye-slash"} onClick={togglePasswordVisiblity}></i>
                  </Button>}
                  <Form.Control.Feedback type="invalid">
                    {errors[elem.id]}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            );
          })}
          <div className="d-flex text-center justify-content-evenly">
            <Button
              disabled={!(isValid && dirty)}
              type="submit"
              className="btn btn-primary mr-1"
            >
              {buttonSubmit}
            </Button>
            { additionalButton ? (
              <Button 
                onClick={additionalButton.handler}>
                  {additionalButton.text}
                </Button>) : (<></>)
            }
            <></>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default BankForm;

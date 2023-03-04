import React from "react";
import { connect } from "react-redux";
import { authenticate } from "../redux/reducer";

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;

  return (
    <div style={{ position: "absolute", height: "100vh", width: "100vw" }}>
      <form
        style={{
          height: "40vh",
          width: "20vw",
          border: "2px solid red",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "24px",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          top: "20%",
        }}
        onSubmit={handleSubmit}
        name={name}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ fontSize: "34px" }} htmlFor="username">
            Username
          </label>
          <input style={{ fontSize: "34px" }} name="username" type="text" />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: "5px",
            gap: "10px",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label style={{ fontSize: "34px" }} htmlFor="password">
            Password
          </label>
          <input style={{ fontSize: "34px" }} name="password" type="password" />
        </div>
        <div>
          <button
            style={{
              fontSize: "38px",
              padding: "10px",
              width: "17vw",
              marginTop: "20px",
            }}
            type="submit"
          >
            {displayName}
          </button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  );
};

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: "login",
    displayName: "Login",
    // error: state.auth.error,
  };
};

const mapSignup = (state) => {
  return {
    name: "signup",
    displayName: "Sign Up",
    // error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const username = evt.target.username.value;
      const password = evt.target.password.value;
      dispatch(authenticate(username, password, formName));
    },
  };
};

export const Login = connect(mapLogin, mapDispatch)(AuthForm);
export const Signup = connect(mapSignup, mapDispatch)(AuthForm);

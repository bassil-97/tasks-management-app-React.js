import React, { useState, useContext } from "react";

import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import Input from "../../shared/components/UIElements/Input";
import "./Auth.css";

export default function Auth() {
  const auth = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { sendRequest } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL + "/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <div className="auth-container">
      <div className="row w-100">
        <div className="col-lg-6">
          <lottie-player
            src="https://assets5.lottiefiles.com/packages/lf20_h4th9ofg.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-lg-6">
          <h1 className="text-capitalize mb-4">
            welcome to task management app
          </h1>
          <h6 className="text-muted mb-4">
            "You can only manage time if you track it right"
          </h6>
          <div className="w-75 mt-4">
            <form onSubmit={authSubmitHandler}>
              {!isLoginMode && (
                <Input
                  element="input"
                  id="name"
                  type="text"
                  label="Your Name"
                  validators={[VALIDATOR_REQUIRE()]}
                  errorText="Please enter a name."
                  onInput={inputHandler}
                  noBorder
                />
              )}
              <Input
                element="input"
                id="email"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email address."
                onInput={inputHandler}
                noBorder
              />
              <Input
                element="input"
                id="password"
                type="password"
                label="Password"
                validators={[VALIDATOR_MINLENGTH(6)]}
                errorText="Please enter a valid password, at least 6 characters."
                onInput={inputHandler}
                noBorder
              />
              <button
                className="btn btn-primary ms-2"
                type="submit"
                disabled={!formState.isValid}
              >
                {isLoginMode ? "LOGIN" : "SIGNUP"}
              </button>
            </form>
            <hr className="mt-5" />
            <div className="sign-up-btn-container">
              {isLoginMode && <small>Don't have an account |</small>}
              {!isLoginMode && <small>Alread have an account |</small>}
              <button className="btn switch-btn" onClick={switchModeHandler}>
                SWITCH TO {isLoginMode ? "SIGNUP" : "LOGIN"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

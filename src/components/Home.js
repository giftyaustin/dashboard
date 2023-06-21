import React from "react";
import "./home.css";

const Home = () => {
  return (
    <div className="home-h">
      <div className="board-home">Board.</div>
      <div className="login-h">
        <div className="login-box">
          <div className="signIn-text">Sign In</div>
          <div className="signIn-text-slg">Sign in to your account</div>
          <div id="signinDiv" className="google-sign"></div>
          <div className="inp-box-h">
            <div className="email-label">Email address</div>
            <input type="email" className="email-inp"/>
            <div className="email-label password-text">Password</div>
            <input type="password" className="email-inp"/>
            <div className="email-label forgot-p">Forgot password?</div>
            <button className="signin-btn">Sign In</button>
          </div>
        </div>
        <div className="no-account">Don't have an account? <span>Register here</span></div>
      </div>
    </div>
  );
};

export default Home;

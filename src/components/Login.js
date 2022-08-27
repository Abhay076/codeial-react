// import React, { Component } from 'react';
// import { Navigate } from 'react-router-dom';
// import { connect } from 'react-redux';

// import { clearAuthState, login } from '../actions/auth';
// class Login extends Component {
//   constructor(props) {
//     super(props);
//     // this.emailInputRef = React.createRef();
//     // this.passwordInputRef = React.createRef();
//     this.state = {
//       email: '',
//       password: '',
//     };
//   }
//   componentWillUnmount() {
//     this.props.dispatch(clearAuthState());
//   }
//   handleEmailChange = (e) => {
//     this.setState({
//       email: e.target.value,
//     });
//   };
//   handlePasswordChange = (e) => {
//     this.setState({
//       password: e.target.value,
//     });
//   };

//   handleFormSubmit = (e) => {
//     e.preventDefault();
//     // console.log('this.emailInputRef',this.emailInputRef);
//     // console.log('this.passwordInputRef',this.passwordInputRef);
//     console.log('this.state', this.state);
//     const { email, password } = this.state;
//     if (email && password) {
//       this.props.dispatch(login(email, password));
//     }
//   };
//   render() {
//     const { error, inProgress, isLoggedin } = this.props.auth;
//     // const {from} = this.props.location.state || {from: {pathname:'/'}};
//     if (isLoggedin) {
//       return <Navigate to="/"/>;
//     }
//     return (
//       <form className="login-form">
//         <span className="login-signup-header">Log In</span>
//         {error && <div className="alert error-dialog">{error}</div>}
//         <div className="field">
//           <input
//             type="email"
//             placeholder="Email"
//             required
//             // ref={this.emailInputRef}
//             onChange={this.handleEmailChange}
//             value={this.state.email}
//           />
//         </div>
//         <div className="field">
//           <input
//             type="password"
//             placeholder="Password"
//             required
//             // ref={this.passwordInputRef}
//             onChange={this.handlePasswordChange}
//             value={this.state.password}
//           />
//         </div>
//         <div className="field">
//           {inProgress ? (
//             <button onClick={this.handleFormSubmit} disabled={inProgress}>
//               Logging in...
//             </button>
//           ) : (
//             <button onClick={this.handleFormSubmit} disabled={inProgress}>
//               Log In
//             </button>
//           )}
//         </div>
//       </form>
//     );
//   }
// }

// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//   };
// }

// export default connect(mapStateToProps)(Login);

// function components

import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, clearAuthState } from '../actions/auth';

function Login(props) {
  useEffect(() => {
    props.dispatch(clearAuthState());
  }, []); //instead of component will unmount
  //basically cleaning existing tokens if any

  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  const location = useLocation(); //here we are using useLocation hook again because this uselocation hook will only get the state in react-router-dom

  //we have to convert this class to function as well

  const { error, inProgress, isLoggedin } = props.auth;
  const from = location.state || '/'; // changed this as well

  if (isLoggedin) {
    return <Navigate to={from} />;
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      props.dispatch(login(email, password));
    }
  };

  return (
    <form className="login-form">
      <span className="login-signup-header">Log In</span>
      {error && <div className="alert error-dailog">{error}</div>}
      <div className="field">
        <input
          type="email"
          placeholder="Email"
          required
          // ref={ emailInputRef}
          onChange={handleEmailChange}
          value={email}
        />
      </div>
      <div className="field">
        <input
          type="password"
          placeholder="Password"
          required
          // ref={ passwordInputRef}
          onChange={handlePasswordChange}
          value={password}
        />
      </div>
      <div className="field">
        {/* change these declarations as well onclick ones  */}
        {inProgress ? (
          <button onClick={(e) => handleFormSubmit(e)} disabled={inProgress}>
            Logging in...
          </button>
        ) : (
          <button onClick={(e) => handleFormSubmit(e)} disabled={inProgress}>
            Log In
          </button>
        )}
      </div>
    </form>
  );
}
//connecting to store to get dispatch action
function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}
export default connect(mapStateToProps)(Login);



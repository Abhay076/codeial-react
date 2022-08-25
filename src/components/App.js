import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404, Login, Signup } from './';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';

const Settings = () => <div>Settings</div>;
const PrivateRoute = (privateRouteProps) => {
  const { isLoggedin, children } = privateRouteProps;
  //return (
   console.log('isLoggedin',isLoggedin);
  // <Route
  // path={path}
  //render={(props) => {
  return isLoggedin ? children : <Navigate to="/login" />;
  // }}
  // />
  //);
};
class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      console.log('user', user);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
    }
  }
  render() {
    console.log('props', this.props);
    const { posts, auth } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
          {/* <Home posts={posts} /> */}

          <Routes>
            <Route exact path="/" element={
            <PrivateRoute
            isLoggedin={auth.isLoggedin}
            >
            <Home posts={posts} />
            </PrivateRoute>
            } />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route
              exact
              path="/settings"
              element={
                <PrivateRoute
                isLoggedin={auth.isLoggedin}
                >
                  <Settings />
                </PrivateRoute>
              }
             
            />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
  };
}

App.propTypes = {
  posts: propTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);

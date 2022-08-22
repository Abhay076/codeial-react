import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { Home, Navbar, Page404 } from './';
const Login = () => <div>Login</div>;
const Signup = () => <div>Signup</div>;

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    console.log('props', this.props);
    const { posts } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
          {/* <Home posts={posts} /> */}

          <Routes>
            <Route
              exact
              path="/"
              element={<Home posts={posts}/>}
            />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route path="*" element={<Page404/>} />
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
  };
}

App.propTypes = {
  posts: propTypes.array.isRequired,
};
export default connect(mapStateToProps)(App);

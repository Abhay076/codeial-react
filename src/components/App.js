import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import propTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import { PostList, Navbar } from './';
const Login = () => <div>Login</div>;
const Signup = () => <div>Signup</div>;
const Home = () => <div>Home</div>;
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
          {/* <PostList posts={posts} /> */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup/>} />
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

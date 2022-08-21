import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { fetchPosts } from '../actions/posts';
import {PostList} from './';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }
  render() {
    console.log('props', this.props);
    const { posts } = this.props;
    return (
      <div>
       <PostList posts={posts}/>
      </div>
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

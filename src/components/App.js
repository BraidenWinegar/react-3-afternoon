import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post'

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts')
    .then(result => {
      this.setState({posts: result.data})
      // console.log(this.state.posts)
      })
    .catch(err => {
      alert('fail get')
    })
  }

  updatePost(idNum, text) {console.log(idNum, text)
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${idNum}`,{text})
    .then(result => {
      this.setState({posts: result.data});
    })
    .catch(error => {
      alert(error)

    })
  }

  deletePost(idNum) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${idNum}`)
    .then( results => {
      this.setState({ posts: results.data})
    })
    .catch(err => alert(err))
  }

  createPost(text) {
    axios.post('https://practiceapi.devmountain.com/api/posts', {text})
    .then(results => this.setState({posts: results.data}))
    .catch(error => alert(error, 'post'))
  }

  render() {
    const { posts } = this.state;
    // console.log(this.deletePost)
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}
            text={this.props.text}/>
          {
            posts.map(post => (
              <Post 
                id={post.id} 
                text={post.text} 
                date={post.date}
                updatePostFn={ this.updatePost }
                deletePostFn={this.deletePost}
              />
            ))
          }
        </section>
      </div>
    );
  }
}

export default App;

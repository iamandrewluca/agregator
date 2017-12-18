import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';
import debounce from 'lodash.debounce';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './Header.js';
import Footer from './Footer.js';
import Menu from './Menu.js';
import Sources from './Sources.js';
import Filters from './Filters.js';
import Topics from './Topics.js';

let fetchUrl = '/admin/api';
let basename = '/admin/';

if (process.env.NODE_ENV === 'development') {
  fetchUrl = 'http://localhost:8080/admin/api'
}

const route = (controller, action) => `${fetchUrl}?controller=${controller}&action=${action}`;

class App extends Component {

  state = {
    sources: null,
    newSource: {
      name: '',
      slug: '',
      resource_url: '',
      rss: '',
      lang_id: ''
    },

    filters: null,
    newFilter: {
      title: '',
      lang_id: '',
    },

    searchedPostsQuery: '',
    searchedPosts: null,
    postSlots: null,
    postSlotsLimit: 3

  };

  catchError = (res) => {
    console.log(res);
  };

  fetchSources = async () => {
    const sourcesPromise = await fetch(route('source', 'all')).catch(this.catchError);
    if (sourcesPromise) {
      const sources = await sourcesPromise.json();
      this.setState({sources})
    }
  };

  updateNewSource = (e) => {
    const newSource = Object.assign({}, this.state.newSource);
    newSource[e.target.id] = e.target.value;
    this.setState({newSource})
  };

  submitNewSource = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const sourcePromise = await fetch(route('source', 'create'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (sourcePromise) {
      const source = await sourcePromise.json();

      const sources = [
        source,
        ...this.state.sources.slice()
      ];

      this.setState({sources})
    }
  };

  updateListItem = (id, e) => {

    const sourceIndex = this.state.sources.findIndex(source => source.id === id);

    if (sourceIndex === -1) return;

    const source = Object.assign({}, this.state.sources[sourceIndex]);
    source[e.target.name] = e.target.value;

    const sources = [
      ...this.state.sources.slice(0, sourceIndex),
      source,
      ...this.state.sources.slice(sourceIndex + 1)
    ];

    this.setState({sources})
  };

  submitListItem = (id, e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    data.append('id', id);

    fetch(route('source', 'update'), {
      method: 'POST',
      body: data,
    })
  };

  deleteListItem = (id, e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', id);

    fetch(route('source', 'delete'), {
      method: 'POST',
      body: data,
    }).then(res => {
      const sourceIndex = this.state.sources.findIndex(source => source.id === id);
      const sources = [
        ...this.state.sources.slice(0, sourceIndex),
        ...this.state.sources.slice(sourceIndex + 1)
      ];

      this.setState({sources})
    }).catch(res => console.log(res))
  };

  updateNewFilter = (e) => {
    const newFilter = Object.assign({}, this.state.newFilter);
    newFilter[e.target.id] = e.target.value;
    this.setState({newFilter});
  };

  submitNewFilter = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const filterPromise = await fetch(route('filter', 'create'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (filterPromise) {
      const filter = await filterPromise.json();

      const filters = [
        filter,
        ...this.state.filters.slice()
      ];

      this.setState({filters})
    }
  };

  deleteFilter = async (id, e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', id);

    fetch(route('filter', 'delete'), {
      method: 'POST',
      body: data,
    }).then(res => {
      const filterIndex = this.state.filters.findIndex(filter => filter.id === id);
      const filters = [
        ...this.state.filters.slice(0, filterIndex),
        ...this.state.filters.slice(filterIndex + 1)
      ];

      this.setState({filters})
    }).catch(res => console.log(res))
  };

  fetchFilters = async () => {
    const filtersPromise = await fetch(route('filter', 'all')).catch(this.catchError);
    if (filtersPromise) {
      const filters = await filtersPromise.json();
      this.setState({filters})
    }
  };

  fetchSlots = async () => {
    const slotsPromise = await fetch(route('topics', 'all')).catch(this.catchError);
    if (slotsPromise) {
      const postSlots = await slotsPromise.json();
      this.setState({postSlots})
    }
  };

  searchPosts = (e) => {
    const { value: searchedPostsQuery } = e.target;
    this.setState({searchedPostsQuery});

    if (searchedPostsQuery.length < 3) {
      this.debouncedSearch.cancel();
      this.setState({searchedPosts: null});
      return;
    }

    this.debouncedSearch(searchedPostsQuery)
  };

  debouncedSearch = debounce(async (searchedPostsQuery) => {

    const data = new FormData();
    data.append('query', searchedPostsQuery);

    const postsPromise = await fetch(route('posts', 'all'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (postsPromise) {
      let posts = await postsPromise.json();

      console.log(posts);

      if (this.state.postSlots.length) {
        posts = posts.filter(post =>
          !this.state.postSlots.some(slot =>
            slot.post_id === post.id));
      }

      console.log(posts);

      this.setState({searchedPosts: posts.slice(0, 3)})
    }
  }, 500);

  deleteSlot = async (id, e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('id', id);

    const slotPromise = await fetch(route('topics', 'delete'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (slotPromise) {
      const slotIndex = this.state.postSlots.findIndex(slot => slot.id === id);
      const postSlots = [
        ...this.state.postSlots.slice(0, slotIndex),
        ...this.state.postSlots.slice(slotIndex + 1)
      ];

      this.setState({postSlots})
    }
  };

  addSlot = async (id, e) => {
    e.preventDefault();

    if (this.state.postSlots.length >= this.state.postSlotsLimit) return;

    const data = new FormData();
    data.append('post_id', id);

    const slotPromise = await fetch(route('topics', 'create'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (slotPromise) {
      const res = await slotPromise.json();
      this.setState({
        searchedPosts: [...this.state.searchedPosts.filter(post => post.id !== res.post_id)],
        postSlots: [
          res, ...this.state.postSlots
        ]
      });
    }
  };

  render() {
    return (
      <Router basename={basename}>
        <div className="App">
          <Header />

          <div className="container">

            <div className="row">
              <div className="col-lg-8 my-3">

                <Menu />

                <Route exact path="/" render={() => (
                  <Sources
                    newSource={this.state.newSource}
                    updateNewSource={this.updateNewSource}
                    submitNewSource={this.submitNewSource}
                    sources={this.state.sources}
                    updateListItem={this.updateListItem}
                    submitListItem={this.submitListItem}
                    deleteListItem={this.deleteListItem}
                    fetchSources={this.fetchSources}
                  />
                )} />

                <Route path="/filters" render={() => (
                  <Filters
                    newFilter={this.state.newFilter}
                    updateNewFilter={this.updateNewFilter}
                    submitNewFilter={this.submitNewFilter}
                    filters={this.state.filters}
                    deleteFilter={this.deleteFilter}
                    fetchFilters={this.fetchFilters}
                  />
                )} />

                <Route path="/topics" render={() => (
                  <Topics
                    postSlots={this.state.postSlots}
                    postSlotsLimit={this.state.postSlotsLimit}

                    searchedPosts={this.state.searchedPosts}
                    searchedPostsQuery={this.state.searchedPostsQuery}

                    searchPosts={this.searchPosts}
                    fetchSlots={this.fetchSlots}
                    deleteSlot={this.deleteSlot}
                    addSlot={this.addSlot}
                  />
                )}/>
                <Route path="/top" component={() => <div>Top 10</div>}/>
                <Route path="/users" component={() => <div>Users</div>}/>

              </div>

              <div className="col-lg-4 mb-3 my-lg-3">
                <h3>Agregator settings</h3>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;

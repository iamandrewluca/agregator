import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import debounce from 'lodash.debounce';
import './App.css';

import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Menu from './components/Menu.js';
import Channels from './components/Channels.js';
import Filters from './components/Filters.js';
import Topics from './components/Topics.js';

const route = () => '/api/admin/channels';


class App extends Component {

  state = {
    channels: null,
    newChannel: {
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

  fetchChannels = async () => {
    const channelsPromise = await fetch(route('source', 'all')).catch(this.catchError);
    if (channelsPromise) {
      const channels = await channelsPromise.json();
      this.setState({channels})
    }
  };

  updateNewChannel = (e) => {
    const newChannel = Object.assign({}, this.state.newChannel);
    newChannel[e.target.id] = e.target.value;
    this.setState({newChannel})
  };

  submitNewChannel = async (e) => {
    e.preventDefault();

    const data = new FormData(e.target);

    const channelPromise = await fetch(route('source', 'create'), {
      method: 'POST',
      body: data,
    }).catch(this.catchError);

    if (channelPromise) {
      const channel = await channelPromise.json();

      const channels = [
        channel,
        ...this.state.channels.slice()
      ];

      this.setState({channels})
    }
  };

  updateListItem = (id, e) => {

    const channelIndex = this.state.channels.findIndex(source => source.id === id);

    if (channelIndex === -1) return;

    const channel = Object.assign({}, this.state.channels[channelIndex]);
    channel[e.target.name] = e.target.value;

    const channels = [
      ...this.state.channels.slice(0, channelIndex),
      channel,
      ...this.state.channels.slice(channelIndex + 1)
    ];

    this.setState({channels})
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
      const channelIndex = this.state.channels.findIndex(channel => channel.id === id);
      const channels = [
        ...this.state.channels.slice(0, channelIndex),
        ...this.state.channels.slice(channelIndex + 1)
      ];

      this.setState({channels})
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
      <div className="App">
        <Header />

        <div className="container">

          <div className="row">
            <div className="col-lg-8 my-3">

              <Menu />

              <Route exact path="/" render={() => (
                <Channels
                  newSource={this.state.newChannel}
                  updateNewSource={this.updateNewChannel}
                  submitNewSource={this.submitNewChannel}
                  sources={this.state.channels}
                  updateListItem={this.updateListItem}
                  submitListItem={this.submitListItem}
                  deleteListItem={this.deleteListItem}
                  fetchChannels={this.fetchChannels}
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
    );
  }
}

export default App;

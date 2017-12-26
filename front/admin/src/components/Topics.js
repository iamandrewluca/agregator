import React, { Component } from 'react';

class Topics extends Component {

  componentDidMount() {
    if (!this.props.postSlots) {
      this.props.fetchSlots()
    }
  }

  render() {
    return this.props.postSlots ? this.showTopics() : (
      <div className="card mb-2">
        <div className="card-body">
          Loading slots...
        </div>
      </div>
    )
  }

  showTopics = () => {

    const { searchPosts, searchedPostsQuery, searchedPosts, addSlot } = this.props;

    return (
      <div>
        <div className="form-group search-box">
          <input
            type="text"
            className="form-control"
            placeholder="Search for posts"
            onChange={searchPosts}
            value={searchedPostsQuery}
          />

          {searchedPosts && searchedPosts.length > 0 && (
            <ul className="list-group search-dropdown mt-1">
              {searchedPosts.map(post => (
                <li key={post.id} className="list-group-item list-group-item-action"
                    onClick={e => addSlot(post.id, e)}>{post.title}</li>
              ))}
            </ul>
          )}
        </div>

        {this.getSlots()}
      </div>
    )
  };

  getSlots() {
    let { postSlots, postSlotsLimit, deleteSlot } = this.props;

    const slots = [];

    const slotsCount = postSlots.length;
    for (let i = 0; i < slotsCount && i < postSlotsLimit ; ++i) {
      slots.push(
        <div key={`slot-${postSlots[i].id}`} className="card mb-2">
          <div className="card-body d-flex align-items-center">
            <span className="mr-3">{postSlots[i].post.title}</span>
            <a href="#delete" className="ml-auto float-right text-danger"
              onClick={e => deleteSlot(postSlots[i].id, e)}>&times;</a>
          </div>
        </div>
      )
    }

    for (let i = postSlots.length; i < postSlotsLimit; ++i) {
      slots.push(
        <div key={i} className="card bg-light mb-2">
          <div className="card-body">
            Empty slot
          </div>
        </div>
      )
    }

    return slots;
  }
}

export default Topics

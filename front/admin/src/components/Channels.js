import React, { Component } from 'react';

import List from './List.js';
import SourceForm from './SourceForm.js';

class Sources extends Component {

  componentDidMount() {
    if (!this.props.channels) {
      this.props.fetchChannels()
    }
  }

  render() {
    const {
      newSource,
      updateNewSource,
      submitNewSource,
      sources,
      updateListItem,
      submitListItem,
      deleteListItem,
    } = this.props;

    return (
      <div>
        <ul className="list-group mb-3">
          <li
            className="list-group-item">

            <div className="d-flex align-items-center justify-content-between">
              CREATE NEW SOURCE
              <button className="btn btn-sm btn-primary"
                      type="button"
                      data-toggle="collapse"
                      data-target="#addSource"
                      aria-expanded="false"
                      aria-controls="addSource">
                ADD
              </button>
            </div>

            <div className="collapse" id="addSource">
              <div className="pt-2">
                <SourceForm
                  item={newSource}
                  updateItem={updateNewSource}
                  submit={submitNewSource}
                />
              </div>
            </div>
          </li>
        </ul>

        <List
          items={sources}
          updateItem={updateListItem}
          submitItem={submitListItem}
          deleteItem={deleteListItem}
        />
      </div>
    )
  }
}

export default Sources;

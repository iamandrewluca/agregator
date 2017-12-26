import React from 'react';

import SourceForm from './SourceForm.js'

const List = ({ items, updateItem, submitItem, deleteItem }) => (
  <ul className="list-group" id="itemsList">

    {items
      ? items.length > 0
          ? items.map(item => (
              <li
                key={item.id}
                className="list-group-item">

                <div className="d-flex align-items-center">
                  <button className="btn btn-sm btn-warning mr-3"
                    type="button"
                    data-toggle="collapse"
                    data-target={`#source-${item.id}`}
                    aria-expanded="false"
                    aria-controls={`source-${item.id}`}
                    data-parent="#itemsList">
                    EDIT
                  </button>
                  {item.name}
                  <div className="ml-auto">
                    <span className="badge badge-warning">{item.ownPost ? item.ownPost.length : 0}</span>
                    <a href="#delete" onClick={e => deleteItem(item.id, e)} className="btn btn-link text-danger">&times;</a>
                  </div>
                </div>

                <div className="collapse" id={`source-${item.id}`}>
                  <div className="pt-2">
                    <SourceForm
                      item={item}
                      updateItem={(e) => updateItem(item.id, e)}
                      submit={(e) => submitItem(item.id, e)}
                    />
                  </div>
                </div>
              </li>
            ))
          : <li className="list-group-item">No items.</li>
      : <li className="list-group-item">Loading items...</li>
    }

  </ul>
);

export default List

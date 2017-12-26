import React, { Component } from 'react';

class Filters extends Component {

  componentDidMount() {
    if (!this.props.filters) {
      this.props.fetchFilters()
    }
  }

  render() {
    const { newFilter, updateNewFilter, submitNewFilter, filters, deleteFilter } = this.props;
    return (
      <div>

        <form className="row no-gutters mb-3" onSubmit={submitNewFilter} >
          <div className="col">
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={newFilter.title}
              onChange={updateNewFilter}
              className="form-control"/>
          </div>
          <div className="col-auto d-flex ml-2">
            <select name="lang_id" id="lang_id" className="form-control" onChange={updateNewFilter}>
              <option value="1">RO</option>
              <option value="2">RU</option>
            </select>
            <button type="submit" className="ml-2 btn btn-primary">ADD</button>
          </div>
        </form>

        <ul className="list-group" id="itemsList">

          {filters
            ? filters.length > 0
              ? filters.map(filter => (
                <li
                  key={filter.id}
                  className="list-group-item d-flex align-items-center">

                  <span className="badge badge-warning mr-2">{filter.lang.name}</span>

                  {filter.title}

                  <a href="#delete"
                     onClick={(e) => deleteFilter(filter.id, e)}
                     className="ml-auto btn btn-link text-danger">&times;</a>
                </li>
              ))
              : <li className="list-group-item">No filters.</li>
            : <li className="list-group-item">Loading filters...</li>
          }

        </ul>
      </div>
    )
  }
}

export default Filters;

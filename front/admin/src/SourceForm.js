import React from 'react';

const SourceForm = ({ item, updateItem, submit }) => (
  <form autoComplete="off" onSubmit={submit}>
    <div className="form-row">
      <div className="form-group col">
        <label htmlFor={`name${item.id}`} className="col-form-label">Name</label>
        <input type="text" className="form-control" name="name" id={`name${item.id}`} defaultValue={item.name} onChange={updateItem} />
      </div>
      <div className="form-group col">
        <label htmlFor={`slug${item.id}`} className="col-form-label">Slug</label>
        <input type="text" className="form-control" name="slug" id={`slug${item.id}`} defaultValue={item.slug} onChange={updateItem} />
      </div>
      <div className="form-group col">
        <label htmlFor={`lang_id${item.id}`} className="col-form-label">Language</label>
        <select name="lang_id" id={`lang_id${item.id}`} className="form-control" onChange={updateItem} defaultValue={item.lang_id}>
          <option value="1">RO</option>
          <option value="2">RU</option>
        </select>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group col-md-6">
        <label htmlFor={`resource_url${item.id}`} className="col-form-label">URL</label>
        <input type="text" className="form-control" name="resource_url" id={`resource_url${item.id}`} placeholder="Resource home page" defaultValue={item.resource_url} onChange={updateItem} />
      </div>
      <div className="form-group col-md-6">
        <label htmlFor={`rss${item.id}`} className="col-form-label">RSS</label>
        <input type="text" className="form-control" name="rss" id={`rss${item.id}`} placeholder="RSS link" defaultValue={item.rss} onChange={updateItem} />
      </div>
    </div>
    <button type="submit" className="btn btn-primary">SAVE</button>
  </form>
)

export default SourceForm

function doFetch(url, options) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('accept', 'application/json,*/*');
  return fetch(url, {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    credentials: 'include',
    cache: 'default'
  })
}
function doCreate(url, options) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('accept', 'application/json,*/*');
  return fetch(url, {
    method: 'POST',
    headers: myHeaders,
    mode: 'cors',
    body: JSON.stringify(options.body),
    credentials: 'include',
    cache: 'default'
  })
}
function doPatch(url, options) {
}
function doDestory(url, options) {
}

let apiPrefix='/api/v1';

class Collection {
  constructor({url, model, modelOption, items}) {
    this.url = apiPrefix+url;
    this.model = model;
  }
  parse(data, options) {
    return data;
  }
  getItems() {}
  fetch() {
    return doFetch(this.url);
    return new Promise(function(resolve, reject) {
      setTimeout(() => {
        resolve([]);
      }, 1000);
    });
  }
  create(obj) {
    return doCreate(this.url,{body:obj});
  }
}

class Model {
  constructor({urlRoot, item, idAttribute}) {
    this.urlRoot = urlRoot;
    this.idAttribute = idAttribute || 'id';
    this.item = item;
  }
  getId() {}
  clear() {}
  setIdAttribute(prop) {
    this.idAttribute = prop || 'id';
  }
  getItem() {}
  getCollection() {
    // 用于取得create时url
  }
  get(prop) {
    return this.item[prop];
  }
  set(prop, value) {
    this.item[prop] = value;
  }
  update() {}
  destroy() {}
  save() {}
  getRCollection({path, RCollecton}) {
    return new RCollecton({
      url: this.url + '/' + path,
    });
  }
  getRModel({path, RModel}) {
    return new RModel({
      urlRoot: this.url + '/' + path,
    })
  }
}
export { Collection, Model };

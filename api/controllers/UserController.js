/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
function find(Model) {
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = function newValue() {
      // console.log(name, '', arguments);
      let rs = fun.apply(this, [].slice.call(arguments))
      rs.method = method || 'POST';
      rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
      return this._fetch(rs);
    };
    return descriptor;
  };
}

let debug = require('debug')('user');

module.exports = {
  fetch(req, res) {
    User.find().then(rs => {
      debug('fetch', rs);
      res.json({
        items: rs,
        total: rs.length
      });
    })
  },
  create(req, res) {
    debug('create', req.body);
    let user = req.body;
    User.create(user).then(rs => {
      debug('create', rs);
      res.status(201).json(rs);
    });
  },
  fetchOne(req, res) {
    res.json({});
  },
  update(req, res) {
    res.json({});
  },
  destroy(req, res) {
    res.status(204).end();
  },
};

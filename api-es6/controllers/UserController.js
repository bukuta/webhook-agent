require("babel-core/register");
require("babel-polyfill");
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
import { authorize, catchError, findResource, checkParams, response } from './decorators.js';
let debug = require('debug')('user');

let User = {
  find() {
    return {
      id: 12,
      name: 'bukuta'
    };
  },
  create() {
    return Promise.resolve({
      id: 123,
      name: 'bukuta2'
    });
  }
}

module.exports = {

  @mapping('get','/users')
  @catchError()
  @response('json')
  //-------捕获-------------
  //----------------------
  //-------拦截---------------顺序执行
  @authorize('admin')
  @checkParams({
    id: { required: true, in: 'body', type: 'integer' }
  })
  @findResource(User)
  fetch(req, res) {
    return req._item;
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

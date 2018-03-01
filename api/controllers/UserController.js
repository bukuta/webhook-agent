"use strict";

var _dec, _dec2, _dec3, _dec4, _dec5, _desc, _value, _obj;

var _decorators = require("./decorators.js");

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

require("babel-core/register");
require("babel-polyfill");
/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

var debug = require('debug')('user');

var User = {
  find: function find() {
    return { id: 12, name: 'bukuta' };
  },
  create: function create() {
    return Promise.resolve({ id: 123, name: 'bukuta2' });
  }
};

module.exports = (_dec = (0, _decorators.catchError)(), _dec2 = (0, _decorators.response)('json'), _dec3 = (0, _decorators.authorize)('admin'), _dec4 = (0, _decorators.checkParams)({
  id: {
    required: true,
    in: 'body',
    type: 'integer'
  }
}), _dec5 = (0, _decorators.findResource)(User), (_obj = {
  fetch: function fetch(req, res) {
    return req._item;
  },
  create: function create(req, res) {
    debug('create', req.body);
    var user = req.body;
    User.create(user).then(function (rs) {
      debug('create', rs);
      res.status(201).json(rs);
    });
  },
  fetchOne: function fetchOne(req, res) {
    res.json({});
  },
  update: function update(req, res) {
    res.json({});
  },
  destroy: function destroy(req, res) {
    res.status(204).end();
  }
}, (_applyDecoratedDescriptor(_obj, "fetch", [_dec, _dec2, _dec3, _dec4, _dec5], Object.getOwnPropertyDescriptor(_obj, "fetch"), _obj)), _obj));
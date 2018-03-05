'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var debug = require('debug')('decorator');
function wait(time) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve();
    }, time);
  });
}

// 拦截
function authorize(role) {
  debug('authorize init', role);
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var r,
            _args = arguments;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                debug('authorized run ', name, '');
                _context.next = 3;
                return wait(1000);

              case 3:
                if (!(Math.random() < 0.0)) {
                  _context.next = 8;
                  break;
                }

                debug('permission.deny');
                throw new Error('forbidden');

              case 8:
                debug('permission.pass');
                _context.next = 11;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args)));

              case 11:
                r = _context.sent;

                debug('after authorized', r);
                return _context.abrupt('return', r);

              case 14:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function newValue(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}

// 捕获
function catchError() {
  debug('catchError init');
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var _args2 = arguments;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                debug('catchError run', name, '');
                _context2.prev = 1;
                _context2.next = 4;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args2)));

              case 4:
                _context2.next = 10;
                break;

              case 6:
                _context2.prev = 6;
                _context2.t0 = _context2['catch'](1);

                debug('error', _context2.t0);
                return _context2.abrupt('return', res.json({
                  error: _context2.t0
                }));

              case 10:
                debug('catchError', name, 'no Error');
                //let rs = fun.apply(this, [].slice.call(arguments))
                //rs.method = method || 'POST';
                //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
                //return this._fetch(rs);

              case 11:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 6]]);
      }));

      function newValue(_x3, _x4) {
        return _ref2.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}
// 捕获
function response(type) {
  debug('response init');
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var rs,
            _args3 = arguments;
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                debug('response run', name, '');
                _context3.next = 3;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args3)));

              case 3:
                rs = _context3.sent;

                debug('response end', name, '', rs);
                res[type](rs);
                //let rs = fun.apply(this, [].slice.call(arguments))
                //rs.method = method || 'POST';
                //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
                //return this._fetch(rs);

              case 6:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function newValue(_x5, _x6) {
        return _ref3.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}

// 拦截
function findResource(Model) {
  debug('findResource', Model);
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var rs,
            _args4 = arguments;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                debug('findResource.run', name, '');
                _context4.next = 3;
                return Model.find();

              case 3:
                rs = _context4.sent;

                req._item = rs;
                _context4.next = 7;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args4)));

              case 7:
                return _context4.abrupt('return', _context4.sent);

              case 8:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function newValue(_x7, _x8) {
        return _ref4.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}

// 拦截
function createResource(Model) {
  debug('createResource', Model);
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var rs,
            _args5 = arguments;
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                debug('createResource.run', name, '');
                _context5.next = 3;
                return Model.find();

              case 3:
                rs = _context5.sent;

                req._item = rs;
                _context5.next = 7;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args5)));

              case 7:
                return _context5.abrupt('return', _context5.sent);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this);
      }));

      function newValue(_x9, _x10) {
        return _ref5.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}
function getValue(req, rule) {
  var value = void 0;
  var name = rule.name;
  var where = rule.in;
  switch (where) {
    case 'path':
      debug('params', req.params);
      value = req.params[name];
      break;
    case 'query':
      debug('query', req.query);
      value = req.query[name];
      break;
    case 'body':
      debug('body', req.body);
      value = req.body;
      break;
    default:
      debug('no place to find ', name);
      break;
  }
  return value;
}

function validate(value, rule) {
  var type = rule.type;
  switch (type) {
    case 'integer':
      value = parseInt(value, 10);
      break;
  }
}

// 拦截
function checkParams(rules) {
  debug('checkParams', rules);
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var _args6 = arguments;
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                debug('checkParams.run', name, rules);
                rules.map(function (rule) {
                  var value = getValue(req, rule);
                  debug('checkParams', rule.name, value, rule);
                  if (rule.required) {
                    if (!value) {
                      throw Error(rule.name + ' required in request');
                    }
                  } else {}
                });
                debug('checkParams.pass');
                _context6.next = 5;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args6)));

              case 5:
                return _context6.abrupt('return', _context6.sent);

              case 6:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function newValue(_x11, _x12) {
        return _ref6.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}

// 路由映射 TODO
function mapping(method, path) {
  debug('mapping', method, path);
  return function decorator(target, name, descriptor) {
    var fun = descriptor.value;
    descriptor.value = function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(req, res) {
        var _args7 = arguments;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.next = 2;
                return fun.apply(this, [].concat(Array.prototype.slice.call(_args7)));

              case 2:
                return _context7.abrupt('return', _context7.sent);

              case 3:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function newValue(_x13, _x14) {
        return _ref7.apply(this, arguments);
      }

      return newValue;
    }();
    return descriptor;
  };
}

exports.authorize = authorize;
exports.catchError = catchError;
exports.findResource = findResource;
exports.checkParams = checkParams;
exports.response = response;
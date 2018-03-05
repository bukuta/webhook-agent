let debug = require('debug')('decorator');
function wait(time) {
  return new Promise((resolve, reject) => {
    setTimeout(function() {
      resolve();
    }, time);
  });
}

// 拦截
function authorize(role) {
  debug('authorize init', role);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('authorized run ', name, '');
      await wait(1000);
      if (Math.random() < 0.0) {
        debug('permission.deny');
        throw new Error('forbidden');
      } else {
        debug('permission.pass');
        let r = await fun.apply(this, [...arguments]);
        debug('after authorized', r);
        return r;
      }
    };
    return descriptor;
  };
}

// 捕获
function catchError() {
  debug('catchError init');
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('catchError run', name, '' );
      try {
        await fun.apply(this, [...arguments]);
      } catch (err) {
        debug('error',err);
        return res.json({
          error: err
        });
      }
      debug('catchError', name, 'no Error');
    //let rs = fun.apply(this, [].slice.call(arguments))
    //rs.method = method || 'POST';
    //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
    //return this._fetch(rs);
    };
    return descriptor;
  };
}
// 捕获
function response(type) {
  debug('response init');
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('response run', name, '');
      let rs = await fun.apply(this, [...arguments]);
      debug('response end', name, '', rs);
      res[type](rs);
    //let rs = fun.apply(this, [].slice.call(arguments))
    //rs.method = method || 'POST';
    //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
    //return this._fetch(rs);
    };
    return descriptor;
  };
}

// 拦截
function findResource(Model) {
  debug('findResource', Model);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('findResource.run', name, '');
      let rs = await Model.find();
      req._item = rs;
      return await fun.apply(this, [...arguments]);
    //let rs = fun.apply(this, [].slice.call(arguments))
    //rs.method = method || 'POST';
    //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
    //return this._fetch(rs);
    };
    return descriptor;
  };
}

// 拦截
function createResource(Model) {
  debug('createResource', Model);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('createResource.run', name, '');
      let rs = await Model.find();
      req._item = rs;
      return await fun.apply(this, [...arguments]);
    //let rs = fun.apply(this, [].slice.call(arguments))
    //rs.method = method || 'POST';
    //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
    //return this._fetch(rs);
    };
    return descriptor;
  };
}
function getValue(req,rule){
  let value;
  let name = rule.name;
  let where = rule.in;
  switch(where){
    case 'path':
      debug('params',req.params);
      value = req.params[name];
      break;
    case 'query':
      debug('query',req.query);
      value = req.query[name];
      break;
    case 'body':
      debug('body',req.body);
      value = req.body;
      break;
    default:
      debug('no place to find ',name);
      break;
  }
  return value;
}

function validate(value,rule){
  let type = rule.type;
  switch(type){
    case 'integer':
      value = parseInt(value,10);
      break;
  }
}

// 拦截
function checkParams(rules) {
  debug('checkParams', rules);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('checkParams.run', name, rules);
      rules.map((rule)=>{
        let value = getValue(req,rule);
        debug('checkParams',rule.name,value,rule);
        if(rule.required){
          if(!value){
            throw Error(rule.name+' required in request');
          }
        }else{
        }
      });
      debug('checkParams.pass');
      return await fun.apply(this, [...arguments]);
    };
    return descriptor;
  };
}

// 路由映射 TODO
function mapping(method,path){
  debug('mapping', method,path);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      return await fun.apply(this, [...arguments]);
    };
    return descriptor;
  };
}

export { authorize, catchError, findResource, checkParams, response,
};

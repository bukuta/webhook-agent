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
      if (Math.random() < 0.2) {
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
function checkParams(rules) {
  debug('checkParams', rules);
  return function decorator(target, name, descriptor) {
    let fun = descriptor.value;
    descriptor.value = async function newValue(req, res) {
      debug('checkParams.run', name, '');
      //if (req.body.id < 5) {
        //throw new Error('params.id.invalid ' + req.body.id);
      //}
      debug('checkParams.pass', req.id);
      return await fun.apply(this, [...arguments]);
    //let rs = fun.apply(this, [].slice.call(arguments))
    //rs.method = method || 'POST';
    //rs.path = '/' + (this.url + subpath).split('/').filter(a => a).join('/');
    //return this._fetch(rs);
    };
    return descriptor;
  };
}

export { authorize, catchError, findResource, checkParams, response,
};

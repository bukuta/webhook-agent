/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

let debug = require('debug')('user');
module.exports = {
  fetch(req,res){
    User.find().then(rs=>{
      debug('fetch',rs);
      res.json({items:rs,total:rs.length});
    })
  },
  create(req,res){
    debug('create',req.body);
    let user = req.body;
    User.create(user).then(rs=>{
      debug('create',rs);
      res.status(201).json(rs);
    });
  },
  fetchOne(req,res){
    res.json({});
  },
  update(req,res){
    res.json({});
  },
  destroy(req,res){
    res.status(204).end();
  },
};


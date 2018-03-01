'use strict';

/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'integer',
      autoIncrement: true,
      unique: true,
      primaryKey: true
    },
    name: {
      type: 'text',
      unique: true
    },
    account: {
      type: 'text',
      unique: true
    },
    password: {
      type: 'text'
    },

    creator: {
      type: 'integer'
    },

    createAt: {
      type: 'datetime'
    },

    updateAt: {
      type: 'datetime'
    }
  }
};
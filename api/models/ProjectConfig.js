/**
 * ProjectConfig.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string'
    },

    // 仓库ID
    project:{
      type: 'string',
    },

    // 认证方式
    authorizeType:{
      type: 'enum',// ssh/http
    },

    // 认证配置
    authorize:{
      type: 'string',
    },


    creator: {
      type: 'string'
    },

    createAt: {
      type: 'string'
    },

    updateAt: {
      type: 'string'
    }
  }
};

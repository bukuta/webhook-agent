'use strict';

/**
 * Project.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    id: {
      type: 'string'
    },

    // 仓库名称
    name: {
      type: 'string'
    },

    // 仓库地址
    url: {
      type: 'string'
    },

    // 仓库分支数
    branches: {
      type: 'integer'
    },

    // 最近更新的分支名
    lastBranch: {
      type: 'string'
    },

    // 最近更新的commitid
    lastCommit: {
      type: 'string'
    },

    // tags 数
    tags: {
      type: 'integer'
    },

    // 最近打的tag
    lastTag: {
      type: 'string'
    },

    // 添加者
    creator: {
      type: 'string'
    },

    // 添加时间
    createAt: {
      type: 'string'
    },

    // 最近更新时间
    updateAt: {
      type: 'string'
    }
  }
};
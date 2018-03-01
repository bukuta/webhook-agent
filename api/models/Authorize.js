'use strict';

/**
 * Authorize.js
 *
 */

module.exports = {

  attributes: {

    id: {
      type: 'string'
    },

    // 认证方式
    authorizeType: {
      type: 'enum' // ssh/http
    },

    // 账号
    account: {
      type: 'string'
    },

    // 密码
    password: {
      type: 'string'
    },

    // 公钥内容 1kb
    sshPublicKey: {
      type: 'string'
    },

    // 私钥内容, 几kb
    sshPrivateKey: {
      type: 'string'
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
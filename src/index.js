require('wepy-async-function/global')

const reUtilRoot = /[\\/]rxjs[\\/]util[\\/]root\.js$/

const wxCompat = `'use strict';
if (typeof wx === 'object' && wx) {
  exports.root = require('../../wepy-async-function/global.js');
}
`

export default class WepyPluginRxJS {
  apply (option) {
    const { type, file } = option

    if (type === 'npm' && reUtilRoot.test(file)) {
      option.code = wxCompat
    }

    option.next()
  }
}

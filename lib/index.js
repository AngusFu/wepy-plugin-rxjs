const {
  readFileSync,
  writeFileSync
} = require('fs')

try {
  require('rxjs/util/root')
} catch (e) {
  throw new Error('File not found: node_modules/rxjs/util/root.js')
}

try {
  require('wepy-async-function')
} catch (e) {
  throw new Error('Module not found: wepy-async-function')
}

const reUseStrict = /^\s*(['"])use strict\1;?/
const wxCompat = `// wepy-plugin-rxjs
'use strict';
if (typeof wx === 'object' && wx) {
  exports.root = require("wepy-async-function/global");
  return
}`

function WepyPluginRxJS () {
  const path = require.resolve('rxjs/util/root')
  const code = readFileSync(path, 'utf-8')

  if (code.slice(3, 20) !== 'wepy-plugin-rxjs') {
    writeFileSync(path, code.replace(reUseStrict, wxCompat))
  }
}

WepyPluginRxJS.prototype.apply = function (op) {
  op.next()
}

module.exports = WepyPluginRxJS

const {
  readFileSync,
  writeFileSync
} = require('fs')
const { version } = require('../package.json')

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

function WepyPluginRxJS () {
  const path = require.resolve('rxjs/util/root')
  let code = readFileSync(path, 'utf-8')

  if (code.slice(3, 20) !== 'wepy-plugin-rxjs') {
    code = code.replace(/^\s*(['"])use strict\1;?/, '')
    code = `// wepy-plugin-rxjs@${version}
'use strict';
if (typeof wx === 'object' && wx) {
  exports.root = require("wepy-async-function/global");
} else {
${code}
}`
    writeFileSync(path, code)
  }
}

WepyPluginRxJS.prototype.apply = function (op) {
  op.next()
}

module.exports = WepyPluginRxJS

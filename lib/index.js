'use strict';

require('wepy-async-function/global');

var reUtilRoot = /[\\/]rxjs[\\/]util[\\/]root\.js$/;

var wxCompat = "'use strict';\nif (typeof wx === 'object' && wx) {\n  exports.root = require('../../wepy-async-function/global.js');\n}\n";

var WepyPluginRxJS = function WepyPluginRxJS () {};

WepyPluginRxJS.prototype.apply = function apply (option) {
  var type = option.type;
    var file = option.file;

  if (type === 'npm' && reUtilRoot.test(file)) {
    option.code = wxCompat;
  }

  option.next();
};

module.exports = WepyPluginRxJS;

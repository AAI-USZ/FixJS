function(require, exports, module) {

exports.isDark = false;
exports.cssClass = "ace-github";
exports.cssText = require('ace/requirejs/text!./github.css');

    var dom = require("../lib/dom");
    dom.importCssString(exports.cssText, exports.cssClass);
}
function(module, filename) {
  var content = NativeModule.require('fs').readFileSync(filename, 'utf8');
  module.exports = JSON.parse(stripBOM(content));
}
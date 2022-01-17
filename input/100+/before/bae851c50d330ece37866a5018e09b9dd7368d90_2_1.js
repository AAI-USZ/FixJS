function(params) {
  var fs = require('fs');
  var config_file = require('yaml-config')
  exports = module.exports = config = config_file.readConfig('./config.yaml')
  exports = module.exports = passport = require('passport');
  exports = module.exports = passwordHash = require('password-hash');
  require('./db-connect');
  require('./schemas.js');

  var models_path = './models',
  models_files = fs.readdirSync(models_path);

  models_files.forEach(function(file) {
    require(models_path + '/' + file);
  });
}
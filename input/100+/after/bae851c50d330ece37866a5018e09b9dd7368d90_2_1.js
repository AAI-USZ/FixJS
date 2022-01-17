function(params) {
  var express = require('express')
      app = express();
  require('./config')(app, {skipSession: true});
  require('./app/models');
}
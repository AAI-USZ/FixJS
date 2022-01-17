function(app, server) {
  exports.admin_controller = require("./admin.js")(app, server);
  exports.auth_controller = require("./auth.js")(app, server);
  exports.home_controller = require("./home.js")(app, server);
}
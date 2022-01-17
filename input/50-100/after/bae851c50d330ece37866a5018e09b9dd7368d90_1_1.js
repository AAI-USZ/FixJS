function(app) {
  exports.admin_controller = require("./admin.js")(app);
  exports.auth_controller = require("./auth.js")(app);
  exports.home_controller = require("./home.js")(app);
}
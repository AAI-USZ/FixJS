function() {
    var StringUtil, fs, template;

    fs = require('fs');

    StringUtil = require('coffee-toaster').StringUtil;

    template = {
      body: "class ~NAMEController extends app.controllers.AppController"
    };

    function Controller(the, opts) {
      var contents, filepath, name;
      this.the = the;
      name = opts[2];
      filepath = "app/controllers/" + name + "_controller.coffee";
      contents = this.build_contents(name);
      fs.writeFileSync(filepath, contents);
      console.log(("" + 'Created: '.bold + " " + filepath).green);
    }

    Controller.prototype.build_contents = function(name) {
      var buffer;
      buffer = "";
      return buffer += template.body.replace("~NAME", StringUtil.ucasef(name));
    };

    return Controller;

  }
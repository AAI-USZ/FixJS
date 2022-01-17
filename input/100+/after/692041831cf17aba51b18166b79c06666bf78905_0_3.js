function() {
    var StringUtil, fs, template;

    fs = require('fs');

    StringUtil = (require('coffee-toaster')).toaster.utils.StringUtil;

    template = {
      body: "class ~NAMEModel extends app.models.AppModel"
    };

    function Model(the, opts) {
      var contents, filepath, name;
      this.the = the;
      name = opts[2];
      filepath = "app/models/" + name + "_model.coffee";
      contents = this.build_contents(name);
      fs.writeFileSync(filepath, contents);
      console.log(("" + 'Created: '.bold + " " + filepath).green);
    }

    Model.prototype.build_contents = function(name) {
      var buffer;
      buffer = "";
      return buffer += template.body.replace("~NAME", StringUtil.ucasef(name));
    };

    return Model;

  }
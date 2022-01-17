function() {
    var FsUtil, StringUtil, Toaster, fs, template;

    fs = require('fs');

    FsUtil = require('coffee-toaster').FsUtil;

    StringUtil = require('coffee-toaster').StringUtil;

    Toaster = require('coffee-toaster').Toaster;

    template = {
      body: "class ~NAMEView extends app.views.AppView"
    };

    function View(the, opts) {
      var folderpath, jade, name, styl, view;
      this.the = the;
      name = opts[2];
      folderpath = "app/views/" + name;
      view = "" + folderpath + "/index_view.coffee";
      FsUtil.mkdir_p(folderpath = "" + folderpath + "/index");
      jade = "" + folderpath + "/index.jade";
      styl = "" + folderpath + "/index.styl";
      fs.writeFileSync(view, this.build_contents("index"));
      console.log(("" + 'Created: '.bold + " " + view).green);
      fs.writeFileSync(jade, "// put your templates (JADE) here ");
      console.log(("" + 'Created: '.bold + " " + jade).green);
      fs.writeFileSync(styl, "// put your styles (STYLUS) here");
      console.log(("" + 'Created: '.bold + " " + styl).green);
    }

    View.prototype.build_contents = function(name) {
      return template.body.replace("~NAME", StringUtil.ucasef(name));
    };

    return View;

  }
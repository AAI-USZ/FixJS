function() {
    var FsUtil, fs, path;

    fs = require('fs');

    path = require('path');

    FsUtil = (require('coffee-toaster')).toaster.utils.FsUtil;

    function Rm(the, opts) {
      var action, name;
      this.the = the;
      action = opts[1];
      name = opts[2];
      switch (action) {
        case "controller":
          this.rm("app/controllers/" + name + "_controller.coffee");
          break;
        case "model":
          this.rm("app/models/" + name + "_model.coffee");
          break;
        case "view":
          this.rm("app/views/" + name + "_view.coffee");
          break;
        case "mvc":
          this.rm("app/controllers/" + name + "_controller.coffee");
          this.rm("app/models/" + name + "_model.coffee");
          this.rm(null, "app/views/" + name);
          break;
        default:
          console.log("ERROR: Valid options: controller,model,view,mvc.");
      }
    }

    Rm.prototype.rm = function(filepath, folderpath) {
      var target;
      if (path.existsSync((target = filepath || folderpath))) {
        try {
          if (filepath != null) {
            fs.unlinkSync(filepath);
          } else if (folderpath != null) {
            FsUtil.rmdir_rf(folderpath);
          }
        } catch (err) {
          throw err;
        }
        return console.log(("" + 'Removed:'.bold + " " + target).green);
      } else {
        return console.log(("Not found: " + filepath).yellow);
      }
    };

    return Rm;

  }
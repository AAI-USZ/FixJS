function(next) {
        this.viewHelpers = {};
        var self = this
          , Helpers = require('./template/helpers')
          , i, helper;

        for(i in Helpers) {
          helper = Helpers[i];

          if(helper.name !== 'registerData') {
            // Create alternative helper name with opposite case style
            helper.altName = helper.altName || utils.string.snakeize(helper.name);

            // Assign to geddy.helpers
            self.viewHelpers[helper.altName] = helper.action;
            self.viewHelpers[helper.name] = helper.action;
          }
        }
        next();
      }
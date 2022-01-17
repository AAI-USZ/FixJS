function(next) {
        this.viewHelpers = {};
        var self = this
          , i, helper;

        for(i in helpers) {
          helper = helpers[i];

          // Create alternative helper name with opposite case style
          helper.altName = helper.altName || utils.string.snakeize(helper.name);

          // Assign to geddy.helpers
          self.viewHelpers[helper.altName] = helper.action;
          self.viewHelpers[helper.name] = helper.action;
        }
        next();
      }
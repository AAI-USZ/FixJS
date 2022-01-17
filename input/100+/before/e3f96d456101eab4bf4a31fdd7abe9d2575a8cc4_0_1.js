function() {
      var _j, _len1;
      if (!(this.controller != null)) {
        Ext.Error.raise({
          msg: 'Error initializing Controllable instance: \`controller\` was not specified.'
        });
      }
      controllers = Ext.isArray(this.controller) ? this.controller : [this.controller];
      for (_j = 0, _len1 = controllers.length; _j < _len1; _j++) {
        controllerClass = controllers[_j];
        if (Ext.ClassManager.isCreated(controllerClass)) {
          try {
            Ext.create(controllerClass, {
              view: this
            });
          } catch (error) {
            Deft.Logger.log("Error initializing Controllable instance: an error occurred while creating an instance of the specified controller: '" + this.controller + "'.");
            throw error;
          }
        } else {
          Ext.Error.raise({
            msg: "Error initializing Controllable instance: an error occurred while creating an instance of the specified controller: '" + this.controller + "' does not exist."
          });
        }
      }
    }
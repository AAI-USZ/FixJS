function(callback) {
    var self = this;
    var tMgr = Tapedeck.Backend.TemplateManager;

    var logStr = "Rendering view '" + self.templateName + "' with params '" +
                 JSON.stringify(self.params) + "'";
    self.log(logStr, tMgr.DEBUG_LEVELS.ALL);

    var message = {
      action: "render",
      templateName: self.templateName,
      packageName: self.packageName,
      params: self.params,
      textTemplate: self.textTemplate
    };

    try {
      Tapedeck.Backend.MessageHandler.messageSandbox(message, function(rendered) {
        self.el.innerHTML = rendered.el;
        callback(self.el);
      });

    } catch(error) {
      console.error("ERROR in view rendering -" + JSON.stringify(error));
    }
  }
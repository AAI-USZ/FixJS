function(e) {
    console.info("Creating asset");
    var that = this;
    // Save the model's original new state to decide
    // whether to send a signal later
    var isNew = this.model.isNew();
    var errors = this.form.commit();
    e.preventDefault();
    if (!errors) {
      this.model.save(null, {
        success: function(model) {
          // TODO: Decide if it's better to listen to the model's
          // "sync" event than to use this callback
          that.setState('display');
          that.render();
          if (isNew) {
            // Model was new before saving
            that.dispatcher.trigger("add:asset", that.model, that.container);
          }
        },
        error: function(model) {
          console.error("error saving the asset");
        }
      });
    }
    else {
      console.error('Error in asset form');
    }
  }
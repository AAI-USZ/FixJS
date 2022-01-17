function (html) {
      this.$el.html(html);
      this.handler = new app.formHandler(this);
      this.handler.link();
      
      if (_.isFunction(this.saved)) {
        this.model.once('saved', this.saved);
      }
      if (_.isFunction(this.error)) {
        this.model.bind('error', this.error);
      }
    }
function() {
      var flash = "<div id='modal-flash' class='alert alert-error' style='display:none;'></div>";
      this.form = new Backbone.Form({
        data  : this.model.toJSON(),
        schema: this.getSchema()
      });
      this.$el.html(flash);
      this.$el.append(this.form.render().el);

      this.$flash             = this.$("#modal-flash");
      this.$targetInput       = this.$('input#targets');
      this.$targetInputField  = this.$('.field-targets');
      this.$sourceSelect      = this.$('select#source');
      this.$httpProxyUrlField = this.$(".field-http_proxy_url");

      this.sourceChanged();

      return this;
    }
function() {
      this.form = new Backbone.Form({
        data  : this.model.toJSON(),
        schema: this.getSchema()
      });
      this.$el.html(this.form.render().el);

      this.$targetInput = this.$('input#targets');
      this.$targetInputField = this.$('.field-targets');
      this.$sourceSelect = this.$('select#source');
      this.$httpProxyUrlField = this.$(".field-http_proxy_url");

      this.sourceChanged();

      return this;
    }
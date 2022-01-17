function() {
      var flash = "<div id='modal-flash' class='alert alert-error' style='display:none;'></div>";
      this.form = new Backbone.Form({
        data  : this.model.toJSON(),
        schema: this.getSchema()
      });
      this.$el.html(flash);
      this.$el.append(this.form.render().el);

      this.$flash                    = this.$("#modal-flash");
      this.$sourceSelect1           = this.$('select#source1');
      this.$sourceSelect2           = this.$('select#source2');
      this.$targetInput1            = this.$('input#targets1');
      this.$targetInput2            = this.$('input#targets2');
      this.$targetInputField1       = this.$('.field-targets1');
      this.$aggregateFunctionField1 = this.$('.field-aggregate_function1');
      this.$httpProxyUrlField1      = this.$(".field-http_proxy_url1");
      this.$targetInputField2       = this.$('.field-targets2');
      this.$aggregateFunctionField2 = this.$('.field-aggregate_function2');
      this.$httpProxyUrlField2      = this.$(".field-http_proxy_url2");

      this.updateSourceFormControls(1, this.$sourceSelect1.val());
      this.updateSourceFormControls(2, this.$sourceSelect2.val());

      return this;
    }
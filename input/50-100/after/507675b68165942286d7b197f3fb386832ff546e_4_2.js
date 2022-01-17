function() {
        this.$el.html(this.template(this.model.attributes));
        this.$('input[type="checkbox"].selector').attr('checked', this.model.selected);

        return this;
      }
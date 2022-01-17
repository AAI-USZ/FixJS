function() {
      this.$e1.html(this.template(this.model.toJSON()));
      this.input = this.$('.edit');
      return this;
    }
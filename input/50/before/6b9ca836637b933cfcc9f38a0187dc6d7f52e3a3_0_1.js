function() {
    $(this.el).html(Mustache.render(this.template, {
      model: this.model.toJSON()
    }));
    return this;
  }
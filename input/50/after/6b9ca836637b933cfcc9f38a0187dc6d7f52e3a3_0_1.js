function() {
    console.log(this.model);
    $(this.el).html(Mustache.render(this.template, {
      name: this.model.get("name")
    }));
    return this;
  }
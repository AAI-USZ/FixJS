function() {
    $(this.el).html(this.template({bankId: this.bankId, model: this.model}));
    return this;
  }
function() {
    var me = this;
    var attributes = this.serialize();
    var options = {success : this._onSuccess, error : this._onError};
    if (this.model.isNew()) {
      if (!attributes.email) return $(this.el).remove();
      dc.ui.spinner.show();
      this.model.newRecord = true;
      this.model.set(attributes);
      Accounts.create(this.model, options);
    } else if (!this.model.invalid && !this.model.changedAttributes(attributes)) {
      this.setMode('display', 'view');
    } else {
      dc.ui.spinner.show();
      this.model.save(attributes, options);
    }
  }
function(event) {
    event.preventDefault();
    var self = this;

    var amount = App.util.convertEurToUsNumber( this.$el.find('#tm-amount').val() );
    var date   = App.util.convertDateToDbFormat( this.$el.find('#tm-date').val() );

    this.model.set({
      bank_account_id: this.bankId,
      date: date,
      amount: amount,
      description: $('#tm-description').val(),
      note: $('#tm-note').val()
    });

    var options = {
      wait: true,
      success: function(event) {
        App.util.alertSuccess("Saved successfully");
        self.hideModal(event);
      },
      error: this.handleError
    };

    $(this.el).mask("Saving...");
    if (this.model.isNew()) {
      App.transactions.create(this.model, options);
      App.transactions.pager();
    } else {
      this.model.save(this.model, options);
    }
  }
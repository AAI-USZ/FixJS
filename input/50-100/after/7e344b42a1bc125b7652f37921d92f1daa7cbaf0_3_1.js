function() {
    var self = this;

    $(this.el).html(this.template({bankId: this.bankId, model: this.model}));

    this.$el.find('div.date').datepicker({ weekStart: 1 })
      .on('show', function() {
        self.showingDatepicker = true;
      });

    return this;
  }
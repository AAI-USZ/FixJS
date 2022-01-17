function () {
    this.$el.html(this.template({bankId: this.bankId}));
    $('#tab-overview', this.parentView.el).html(this.el);

    this.$el.find('div.date').datepicker({
      weekStart: 1
      // format: 'dd.mm.YYYY'
    });
    this.delegateEvents();
    return this;
  }
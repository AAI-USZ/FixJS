function() {
    $(this.el).bind('pagebeforeshow', this.render);
    $(this.el).find('.save').click(this.save);
    $(this.el).find('input.currencytext').bind('change', this.currencyTextChanged);
    $('#save-currency').bind('change', this.sliderChanged);
  }
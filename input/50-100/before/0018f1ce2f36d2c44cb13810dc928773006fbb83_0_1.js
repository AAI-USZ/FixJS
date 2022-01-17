function() {
    $(this.el).bind('pagebeforeshow', this.render);
    $(this.el).find('.save').click(this.save);
  }
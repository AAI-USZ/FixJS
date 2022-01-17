function() {
    this.closeTimeout = -1;
    _.defaults(this.options, this.default_options);
    this.template_base = _.template(this.options.template_base || cdb.templates.getTemplate('common/notification') || '');
    this.$el.hide();
  }
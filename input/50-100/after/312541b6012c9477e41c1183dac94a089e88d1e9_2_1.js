function() {
      this.map = this.model;
      _.defaults(this.options, this.default_options);
      this.template = this.options.template ? _.template(this.options.template): cdb.templates.getTemplate('geo/zoom');
      //TODO: bind zoom change to disable zoom+/zoom-
  }
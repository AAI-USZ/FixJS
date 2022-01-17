function() {
    _.bindAll(this,"open", "hide", "handle_click");

    // Extend options
    _.defaults(this.options, this.default_options);

    // Dropdown template
    this.template_base = cdb.templates.getTemplate(this.options.template_base);

    // Bind to target
    $(this.options.target).bind({"click": this.handle_click});

    // Is open flag
    this.isOpen = false;

  }
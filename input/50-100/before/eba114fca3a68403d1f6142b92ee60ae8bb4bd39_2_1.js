function AbstractChosen(form_field, options) {
      this.form_field = form_field;
      this.options = options != null ? options : {};
      this.set_default_values();
      this.is_multiple = this.form_field.multiple;
      this.default_text_default = this.is_multiple ? "Select Some Options" : "Select an Option";
      this.setup();
      this.set_up_html();
      this.register_observers();
      this.finish_setup();
    }
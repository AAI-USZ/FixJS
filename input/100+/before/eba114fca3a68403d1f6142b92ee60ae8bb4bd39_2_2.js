function() {
      var base_template, container_props, dd_top, dd_width, sf_width;
      this.container_id = this.form_field.identify().replace(/[^\w]/g, '_') + "_chzn";
      this.f_width = this.form_field.getStyle("width") ? parseInt(this.form_field.getStyle("width"), 10) : this.form_field.getWidth();
      container_props = {
        'id': this.container_id,
        'class': "chzn-container" + (this.is_rtl ? ' chzn-rtl' : ''),
        'style': 'width: ' + this.f_width + 'px'
      };
      this.default_text = this.form_field.readAttribute('data-placeholder') ? this.form_field.readAttribute('data-placeholder') : this.default_text_default;
      base_template = this.is_multiple ? new Element('div', container_props).update(this.multi_temp.evaluate({
        "default": this.default_text
      })) : new Element('div', container_props).update(this.single_temp.evaluate({
        "default": this.default_text
      }));
      this.form_field.hide().insert({
        after: base_template
      });
      this.container = $(this.container_id);
      this.container.addClassName("chzn-container-" + (this.is_multiple ? "multi" : "single"));
      this.dropdown = this.container.down('div.chzn-drop');
      dd_top = this.container.getHeight();
      dd_width = this.f_width - get_side_border_padding(this.dropdown);
      this.dropdown.setStyle({
        "width": dd_width + "px",
        "top": dd_top + "px"
      });
      this.search_field = this.container.down('input');
      this.search_results = this.container.down('ul.chzn-results');
      this.search_field_scale();
      this.search_no_results = this.container.down('li.no-results');
      if (this.is_multiple) {
        this.search_choices = this.container.down('ul.chzn-choices');
        this.search_container = this.container.down('li.search-field');
      } else {
        this.search_container = this.container.down('div.chzn-search');
        this.selected_item = this.container.down('.chzn-single');
        sf_width = dd_width - get_side_border_padding(this.search_container) - get_side_border_padding(this.search_field);
        this.search_field.setStyle({
          "width": sf_width + "px"
        });
      }
      this.results_build();
      this.set_tab_index();
      return this.form_field.fire("liszt:ready", {
        chosen: this
      });
    }
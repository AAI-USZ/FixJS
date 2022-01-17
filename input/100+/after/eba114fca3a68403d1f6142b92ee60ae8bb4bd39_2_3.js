function() {
      var content, data, _i, _len, _ref;
      this.parsing = true;
      this.results_data = root.SelectParser.select_to_array(this.form_field);
      if (this.is_multiple && this.choices > 0) {
        this.search_choices.select("li.search-choice").invoke("remove");
        this.choices = 0;
      } else if (!this.is_multiple) {
        this.selected_item.addClassName("chzn-default").down("span").update(this.default_text);
        if (this.form_field.options.length <= this.disable_search_threshold) {
          this.container.addClassName("chzn-container-single-nosearch");
        } else {
          this.container.removeClassName("chzn-container-single-nosearch");
        }
      }
      content = '';
      _ref = this.results_data;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        data = _ref[_i];
        if (data.group) {
          content += this.result_add_group(data);
        } else if (!data.empty) {
          content += this.result_add_option(data);
          if (data.selected && this.is_multiple) {
            this.choice_build(data);
          } else if (data.selected && !this.is_multiple) {
            this.selected_item.removeClassName("chzn-default").down("span").update(data.html);
            if (this.allow_single_deselect) this.single_deselect_control_build();
          }
        }
      }
      this.search_field_disabled();
      this.show_search_field_default();
      this.search_field_scale();
      this.search_results.update(content);
      return this.parsing = false;
    }
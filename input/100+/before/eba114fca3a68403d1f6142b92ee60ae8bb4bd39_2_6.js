function(pos) {
      var result, result_data;
      result_data = this.results_data[pos];
      result_data.selected = false;
      this.form_field.options[result_data.options_index].selected = false;
      result = $(this.container_id + "_o_" + pos);
      result.removeClassName("result-selected").addClassName("active-result").show();
      this.result_clear_highlight();
      this.winnow_results();
      //if (typeof Event.simulate === 'function') this.form_field.simulate("change");
      if (typeof Event.simulate === 'function') {
        this.form_field.simulate("change", {
          deselected: this.form_field.options[result_data.options_index].value
        });
      }
      return this.search_field_scale();
    }
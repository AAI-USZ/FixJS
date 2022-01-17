function(pos) {
      var result, result_data;
      result_data = this.results_data[pos];
      result_data.selected = false;
      this.form_field.options[result_data.options_index].selected = false;
      result = $("#" + this.container_id + "_o_" + pos);
      result.removeClass("result-selected").addClass("active-result").show();
      this.result_clear_highlight();
      this.winnow_results();
      // changes https://github.com/harvesthq/chosen/pull/499
      // this.form_field_jq.trigger("change");
      this.form_field_jq.trigger("change", {
          'deselected': this.form_field.options[result_data.options_index].value
      });
      return this.search_field_scale();
    }
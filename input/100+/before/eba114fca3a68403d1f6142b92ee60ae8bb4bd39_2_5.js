function(evt) {
      var high, item, position;
      if (this.result_highlight) {
        high = this.result_highlight;
        this.result_clear_highlight();
        if (this.is_multiple) {
          this.result_deactivate(high);
        } else {
          this.search_results.descendants(".result-selected").invoke("removeClassName", "result-selected");
          this.selected_item.removeClassName("chzn-default");
          this.result_single_selected = high;
        }
        high.addClassName("result-selected");
        position = high.id.substr(high.id.lastIndexOf("_") + 1);
        item = this.results_data[position];
        item.selected = true;
        this.form_field.options[item.options_index].selected = true;
        if (this.is_multiple) {
          this.choice_build(item);
        } else {
          this.selected_item.down("span").update(item.html);
          if (this.allow_single_deselect) this.single_deselect_control_build();
        }
        if (!(evt.metaKey && this.is_multiple)) this.results_hide();
        this.search_field.value = "";
        if (typeof Event.simulate === 'function') {
          //this.form_field.simulate("change");
          this.form_field.simulate("change", {
            'selected': this.form_field.options[item.options_index].value
          });
        }
        return this.search_field_scale();
      }
    }
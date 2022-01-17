function() {
      var dd_top;
      if (!this.is_multiple) {
        this.selected_item.addClassName('chzn-single-with-drop');
        if (this.result_single_selected) {
          this.result_do_highlight(this.result_single_selected);
        }
      } else if (this.max_selected_options <= this.choices) {
        this.form_field.fire("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      dd_top = this.is_multiple ? this.container.getHeight() : this.container.getHeight() - 1;
      this.form_field.fire("liszt:showing_dropdown", {
        chosen: this
      });
      this.dropdown.setStyle({
        "top": dd_top + "px",
        "left": 0
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.value = this.search_field.value;
      return this.winnow_results();
    }
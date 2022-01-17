function() {
      var dd_top;
      if (!this.is_multiple) {
        this.selected_item.addClass("chzn-single-with-drop");
        if (this.result_single_selected) {
          this.result_do_highlight(this.result_single_selected);
        }
      } else if (this.max_selected_options <= this.choices) {
        this.form_field_jq.trigger("liszt:maxselected", {
          chosen: this
        });
        return false;
      }
      dd_top = this.is_multiple ? this.container.height() : this.container.height() - 1;
      this.form_field_jq.trigger("liszt:showing_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "top": dd_top + "px",
        "left": 0
      });
      this.results_showing = true;
      this.search_field.focus();
      this.search_field.val(this.search_field.val());
      return this.winnow_results();
    }
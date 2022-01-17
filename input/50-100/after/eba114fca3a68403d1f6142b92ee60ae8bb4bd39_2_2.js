function() {
      if (!this.is_multiple) {
        this.selected_item.removeClassName('chzn-single-with-drop');
      }
      this.result_clear_highlight();
      this.form_field.fire("liszt:hiding_dropdown", {
        chosen: this
      });
      this.dropdown.setStyle({
        "left": "-9000px"
      });
      return this.results_showing = false;
    }
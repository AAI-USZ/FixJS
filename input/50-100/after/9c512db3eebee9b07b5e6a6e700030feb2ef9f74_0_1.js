function() {
      if (!this.is_multiple) {
        this.selected_item.removeClass("chzn-single-with-drop");
      }
      this.result_clear_highlight();
      this.search_results.scrollTop(0);
      this.form_field_jq.trigger("liszt:hiding_dropdown", {
        chosen: this
      });
      this.dropdown.css({
        "left": "-9000px",
        "display": "none"
      });
      return this.results_showing = false;
    }
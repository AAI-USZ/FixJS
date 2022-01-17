function() {
      if (!this.is_multiple) this.results_reset_cleanup();
      this.result_clear_highlight();
      this.result_single_selected = null;
      return this.results_build();
    }
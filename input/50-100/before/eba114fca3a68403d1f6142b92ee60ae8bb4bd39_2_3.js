function(evt) {
      this.form_field.options[0].selected = true;
      this.selected_item.down("span").update(this.default_text);
      if (!this.is_multiple) this.selected_item.addClassName("chzn-default");
      this.show_search_field_default();
      evt.target.remove();
      if (typeof Event.simulate === 'function') this.form_field.simulate("change");
      if (this.active_field) return this.results_hide();
    }
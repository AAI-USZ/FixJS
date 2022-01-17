function(evt) {
      this.form_field.options[0].selected = true;
      this.selected_item.find("span").text(this.default_text);
      if (!this.is_multiple) this.selected_item.addClass("chzn-default");
      this.show_search_field_default();
      $(evt.target).remove();
      this.form_field_jq.trigger("change");
      if (this.active_field) return this.results_hide();
    }
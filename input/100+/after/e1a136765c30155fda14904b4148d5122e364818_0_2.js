function(data) {
    var response = jQuery.parseJSON(jQuery.trim(data));
    if (response !== null && response.hasOwnProperty("display_as")) {
      this.element.attr("data-original-content", this.element.html());
      this.original_content = this.element.html();
      this.element.html(response["display_as"]);
    }
    this.element.trigger(jQuery.Event("ajax:success"), data);
    if (this.always_display_edit == true) { return; }
    // Binding back after being clicked
    jQuery(this.activator).bind('click', {editor: this}, this.clickHandler);
    this.element.trigger(jQuery.Event("best_in_place:deactivate"));
  }
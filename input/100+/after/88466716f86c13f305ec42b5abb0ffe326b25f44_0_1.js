function(request, error) {
    this.element.html(this.oldValue);

    // Display all error messages from server side validation
    $.each(jQuery.parseJSON(request.responseText), function(index, value) {
      if( typeof(value) == "object") {value = index + " " + value.toString(); }
      var container = $("<span class='flash-error'></span>").html(value);
      container.purr();
    });
    this.element.trigger($.Event("ajax:error"));
    
    // Binding back after being clicked
    $(this.activator).bind('click', {editor: this}, this.clickHandler);
  }
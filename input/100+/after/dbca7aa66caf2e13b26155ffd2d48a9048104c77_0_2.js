function() {
    var editor = this;
    if (this.formType in {"input":1, "textarea":1} && this.getValue() == this.oldValue)
    { // Avoid request if no change is made
      this.abort();
      return true;
    }
    if(!this.element.children(':first').attr('id'))
    {
      this.elementId = this.element.children(':first').attr('id', this.element.attr('id') + '_input').attr('id');
    } else {
      this.elementId = this.element.children(':first').attr('id');
    }
    
    var originalBoxShadow = $('#' + editor.elementId).css('box-shadow');
    if (this.always_display_edit == true) { 
      $('#' + editor.elementId).animate({boxShadow:'0px 0px 4px 2px rgb(255,215,0)'}, 500);
    };
    this.isNil = false;
    editor.ajax({
      "type"       : "post",
      "dataType"   : "text",
      "data"       : editor.requestData(),
      "success"    : function(data){ 
        $('#' + editor.elementId).animate(
          {boxShadow:'0px 0px 4px 2px rgb(50, 255, 85)'}, 
          1000,
          function () { 
            setTimeout("$('#" + editor.elementId + "').css('box-shadow', '" + originalBoxShadow + "')", 2000) 
          });
        editor.loadSuccessCallback(data); 
      },
      "error"      : function(request, error){ 
        editor.loadErrorCallback(request, error); 
        $('#' + editor.elementId).animate(
          {boxShadow:'0px 0px 4px 2px rgb(255, 50, 75)'}, 
          1000,
          function () { 
            setTimeout("$('#" + editor.elementId + "').css('box-shadow', '" + originalBoxShadow + "')", 2000) 
          });
      }
    });
    if (this.always_display_edit == true) { return; }

    if (this.formType == "select") {
      var value = this.getValue();
      jQuery.each(this.values, function(i, v) {
        if (value == v[0]) {
          editor.element.html(v[1]);
        }
      }
    );
    } else if (this.formType == "checkbox") {
      editor.element.html(this.getValue() ? this.values[1] : this.values[0]);
    } else {
      editor.element.html(this.getValue() !== "" ? this.getValue() : this.nil);
    }
    editor.element.trigger(jQuery.Event("best_in_place:update"));
  }
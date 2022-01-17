function(){
    selectHTML = "<input";
    selectHTML += " type=test id='" + this.name + "' name='" + this.name +
    "' + value='" +
    Dashboards.getParameterValue(this.parameter) +
    (this.charWidth ? ("' + size='" + this.charWidth) : "") +
    (this.maxChars ? ("' + maxlength='" + this.maxChars) : "") +
    "'>";
    $("#" + this.htmlObject).html(selectHTML);
    var myself = this;
    $("#" + this.name).change(function(){
      Dashboards.processChange(myself.name);
    }).keyup(function(event){
      if (event.keyCode == 13) {
        Dashboards.processChange(myself.name);
      }
    });
  }
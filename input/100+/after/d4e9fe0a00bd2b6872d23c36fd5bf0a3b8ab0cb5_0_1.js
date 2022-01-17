function(){
    selectHTML = "<input";
    selectHTML += " type=text id='" + this.name + "' name='" + this.name +
    "'  value='" +
    Dashboards.getParameterValue(this.parameter) +
    (this.size ? ("' size='" + this.size) : "") +
    (this.maxLength ? ("' maxlength='" + this.maxLength) : "") +
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
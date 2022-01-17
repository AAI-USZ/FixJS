function () {
    var ph = $("#" + this.htmlObject);
    var myArray = this.getValuesArray(),
    isMultiple = false;

    selectHTML = "<select";

    // set size
    if (this.size != undefined) {
      selectHTML += " size='" + this.size + "'";
    }
    if (this.type.toLowerCase().indexOf("selectmulti") != -1) {
      if (typeof(this.isMultiple) == 'undefined' || this.isMultiple == true) {
        selectHTML += " multiple";
        isMultiple = true;
      } else
      if (!this.isMultiple && this.size == undefined) {
        selectHTML += " size='" + myArray.length + "'";
      }
    }
    if (this.externalPlugin == "chosen") {
      selectHTML += " class='chzn-select'";
    }
    if (this.externalPlugin == "hynds") {
      selectHTML += " class='hynds-select'";
    }

    selectHTML += ">";
    var firstVal,
    currentVal = Dashboards.ev(Dashboards.getParameterValue(this.parameter)),
    currentIsValid = false;

    var hasCurrentVal = currentVal != null; //typeof currentVal != undefined;
    //var vid = this.valueAsId == false ? false : true;
    var vid = !!this.valueAsId;
    var hasValueSelected = false;
    var isSelected = false;

    var currentValArray = [];
    if(currentVal instanceof Array || (currentVal != null && typeof(currentVal) == "object" && currentVal.join)) {
      currentValArray = currentVal;
    } else if(typeof(currentVal) == "string"){
      currentValArray = currentVal.split("|");
    }

    for (var i = 0, len = myArray.length; i < len; i++) {
      if (myArray[i] != null && myArray[i].length > 0) {
        var ivid = vid || myArray[i][0] == null;
        var value, label;
        if (myArray[i].length > 1) {
          value = "" + myArray[i][ivid ? 1 : 0];
          label = "" + myArray[i][1];
        } else {
          value = "" + myArray[i][0];
          label = "" + myArray[i][0];
        }
        if (i == 0) {
          firstVal = value;
        }
        if (jQuery.inArray( value, currentValArray) > -1) {
          currentIsValid = true;
        }
        selectHTML += "<option value = '" + Dashboards.escapeHtml(value) + "' >" + Dashboards.escapeHtml(label) + "</option>";
      }
    }

    selectHTML += "</select>";
    ph.html(selectHTML);

    /* If the current value for the parameter is invalid or empty, we need
     * to pick a sensible default. If there is a defaultIfEmpty value,
     * we use that; otherwise, we use the first value in the selector.
     * An "invalid" value is, of course, one that's not in the values array.
     */
    if (isMultiple ? !currentIsValid && currentVal !== '' : !currentIsValid) {
      var replacementValue = (this.defaultIfEmpty)? firstVal : null;
      $("select", ph).val(replacementValue);
      Dashboards.setParameter(this.parameter,replacementValue);
      Dashboards.processChange(this.name);
    } else {
      $("select", ph).val(currentValArray);
    }
    
    if( this.externalPlugin == "chosen" ){ 
      ph.find("select.chzn-select").chosen(); 
    }
    
    if( this.externalPlugin == "hynds" ){ 
      	ph.find("select.hynds-select").multiselect({
			multiple: (isMultiple)? true : false  
		}); 
    }
    
    var myself = this;
    $("select", ph).change(function () {
      Dashboards.processChange(myself.name);
    });
  }
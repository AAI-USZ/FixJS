function(componentId, inputId, untitledLabel, isAddMode) {
  var component = document.getElementById(componentId);
  var input = eXo.core.DOMUtil.findDescendantById(component, inputId);
  if (input) {
    input.form.onsubmit = function() {
      return false;
    };
    input.onfocus = function(evt) {
      if (this.value == untitledLabel && isAddMode)
        this.value = "";
    };
  }
}
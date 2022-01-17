function validate_pool(form) {
  var ok = true;
  var error = "Please correct the following errors:\n";
  if (form.concentration.value.length == 0) {
    error += "You have not filled the Concentration of the Pool.\n";
    ok = false;
  }

  var numberExp = /[.*0-9]/;
  if (!numberExp.test(form.concentration.value)) {
    error += "The Concentration of the Pool can only be numbers.\n";
    ok = false;
  }

  if (form.creationDate.value.length == 0) {
    error += "You have not filled the Creation Date of the Pool.\n";
    ok = false;
  }

  if (!jQuery('#dillist').html().trim()) {
    error += "You have selected no dilutions for this Pool.\n";
    ok = false;
  }

  if (!ok) {
    alert(error);
  }

  return ok;
}
function validate_input_field(field, name, okstatus) {
  var errormsg = '';
  if (!jQuery(field).val().match(/^[a-zA-Z0-9_\^\-\.\s]+$/)) {
    okstatus = false;
    errormsg = "In the " + name + " " + jQuery(field).attr("id") + " field you CAN use alpha numeric values with the following symbols:\n"
                       + "^ - _ .\n"
            + "but you CANNOT use slashes, comma, brackets, single or double quotes, and it CANNOT end with a space or be empty\n\n";
  }
  return {"okstatus":okstatus, "errormsg":errormsg};
}
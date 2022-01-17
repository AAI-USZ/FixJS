function() {
  var element = $('<input type="text" />');
  var options = { messages: { only_integer: "failed validation" }, only_integer: true };
  element.val('123.456');
  equal(ClientSideValidations.validators.local.numericality(element, options), "failed validation");
}
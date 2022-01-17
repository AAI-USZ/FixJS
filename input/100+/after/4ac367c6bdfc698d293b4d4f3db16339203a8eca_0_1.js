function(group, value, label) {
  var field = $("input[type='hidden']", group);
  var initialVal = field.val();

  // if new value is in old value, don't add it
  // TODO: add in some error display?
  var regExPattern = new RegExp("^" + value + "$");
  if (initialVal.match(regExPattern) != null)
    return false;

  // otherwise, add it
  if (initialVal != '')
    field.val(initialVal + "," + value);
  else
    field.val(value);

  // build list item from selected option
  var anchor = "<i class='icon-remove' onclick='return inpho.semantics.removeListItem($(this).parent())'></i> ";
  var li = "<li data-value='" + value + "'>" + anchor + label + "</li>";
  $("ul", group).append( li );
}
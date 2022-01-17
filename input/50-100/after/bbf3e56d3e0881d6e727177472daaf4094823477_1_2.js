function() {
  $(this).unbind('click');
  $(this).removeClass('locked');
  $(this).addClass('unlocked');
  myTextInputValue = $(this).text();
  $(this).html('<input type="text" class="name input-xxlarge" value="' + $(this).html() + '" />');
  $(this).children().focus();
  return false;
}
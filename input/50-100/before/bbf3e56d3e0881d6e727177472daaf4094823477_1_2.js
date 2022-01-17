function() {
  $(this).unbind('click');
  $(this).removeClass('locked');
  $(this).addClass('unlocked');
  myHeaderName = $(this).text();
  $(this).html('<input type="text" class="name input-xxlarge" value="' + $(this).html() + '" />');
  $('h1 input.name').focus();
  return false;
}
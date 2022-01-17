function(e) {
  $('h1').removeClass('unlocked');
  $('h1').addClass('locked');
  $(this).remove();
  $('h1').html(myTextInputValue);
  myTextInputValue = '';
  $('h1.locked').on('click', editTextInput);
  return false;
}
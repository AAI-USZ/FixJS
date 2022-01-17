function(e) {
  $('h1').removeClass('unlocked');
  $('h1').addClass('locked');
  $(this).remove();
  $('h1').html(myHeaderName);
  myHeaderName = '';
  $('h1.locked').on('click', editObjectName);
  return false;
}
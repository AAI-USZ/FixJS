function(){
  $('#rendered-tweets').prepend(
    '<p class="error">'+
      '<strong>Twitter Error</strong><br>'+
      'Are you sure the tweet reference is correct? '+
      'Maybe wait a few seconds and try again? '+
      'You may have requested a private tweet.'+
    '</p>'
  );
  // we're finished, so reset the button
  $('#constatus').html('');
  $('#confabulation').children(':submit')
    .val('Confabulate')
    .removeAttr('disabled');
}
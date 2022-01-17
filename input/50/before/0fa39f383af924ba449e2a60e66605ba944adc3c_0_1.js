function(jqXHR, status, errorText){
  if (status !== 'timeout') {
    // we got an error of some sort, with JSONP it's usually not possible
    // to know what exactly, we just get the timeout - so if we get something
    // else we should log it
    console.log(jqXHR, status, errorText);
  }
  $('#rendered-tweets').prepend(
    '<p class="error">'+
      '<strong>Twitter Error</strong><br>'+
      'Are you sure the tweet reference is correct? '+
      'Maybe wait a few seconds and try again?'+
    '</p>'
  );
}
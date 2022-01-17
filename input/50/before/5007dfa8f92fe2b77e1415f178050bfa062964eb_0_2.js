function () {
  var savedpost = sessionStorage.getItem('humpinatorPostSaver');
  if (savedpost) {
    $('textarea[name="message"]').val(decodeURIComponent(savedpost)); // restore old message, if exists
    sessionStorage.removeItem('humpinatorPostSaver'); // and remove it so it doesn't linger
  }
}
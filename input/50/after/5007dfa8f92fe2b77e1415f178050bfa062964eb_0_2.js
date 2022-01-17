function () {
  var savedpost = window.sessionStorage.getItem('humpinatorPostSaver');
  if (savedpost) {
    $('textarea[name="message"]').val(decodeURIComponent(savedpost)); // restore old message, if exists
    window.sessionStorage.removeItem('humpinatorPostSaver'); // and remove it so it doesn't linger
  }
}
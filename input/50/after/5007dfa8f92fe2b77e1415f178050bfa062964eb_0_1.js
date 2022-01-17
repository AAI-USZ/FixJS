function () {
  window.sessionStorage.setItem('humpinatorPostSaver', encodeURIComponent($('textarea[name="message"]').val()));
}
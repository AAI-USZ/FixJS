function seekUp() {
  var request = null;
  try {
    request = mozFMRadio.seekUp();
  } catch (e) {
    console.log(e);
  }

  if (null == request) {
    return;
  }

  request.onsuccess = function seekup_onsuccess() {
    $('current_freq').innerHTML = mozFMRadio.frequency;
    console.log('Seek up complete, and got new program.');
  };

  request.onerror = function seekup_onerror() {
    console.log('Failed to seek up.');
  };
}
function seekDown() {
  var request = null;
  try {
    request = mozFMRadio.seekDown();
  } catch (e) {
    console.log(e);
  }

  if (null == request) {
    return;
  }

  request.onsuccess = function seekdown_onsuccess() {
    $('current_freq').innerHTML = mozFMRadio.frequency;
    console.log('Seek down complete, and got new program.');
  };

  request.onerror = function seekdown_onerror() {
    console.log('Failed to seek down.');
  };
}
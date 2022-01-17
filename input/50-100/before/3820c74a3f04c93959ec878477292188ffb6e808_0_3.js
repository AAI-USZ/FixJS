function seekdown_onsuccess() {
    $('current_freq').innerHTML = mozFMRadio.frequency;
    console.log('Seek down complete, and got new program.');
  }
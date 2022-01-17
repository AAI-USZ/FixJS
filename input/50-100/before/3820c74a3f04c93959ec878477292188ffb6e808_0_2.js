function seekup_onsuccess() {
    $('current_freq').innerHTML = mozFMRadio.frequency;
    console.log('Seek up complete, and got new program.');
  }
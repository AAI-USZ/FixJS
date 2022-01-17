function setFreq(freq) {
  var request = null;
  try {
    request = mozFMRadio.setFrequency(freq);
  } catch (e) {
    console.log(e);
  }

  if (null == request) {
    return;
  }

  request.onsuccess = function setfreq_onsuccess() {
    console.log('Set freq successfully!' + freq);
  };

  request.onerror = function sefreq_onerror() {
    console.log('Fail to set fm freq');
  };
}
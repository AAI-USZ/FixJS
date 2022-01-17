function enableFM(enable) {
  if (!mozFMRadio.antennaAvailable) {
    updateAntennaUI();
    return;
  }

  var request = null;
  try {
    request = mozFMRadio.setEnabled(enable);
  } catch (e) {
    console.log(e);
  }

  if (null == request) {
    return;
  }

  request.onsuccess = function turnon_onsuccess() {
    console.log('FM status is changed to ' + mozFMRadio.enabled);
  };

  request.onerror = function turnon_onerror() {
    console.log('Failed to turn on FM!');
  };
}
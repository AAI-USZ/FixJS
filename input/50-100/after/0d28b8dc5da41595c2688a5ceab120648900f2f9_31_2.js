function setWifiEnabled(val) {
    gWifiCheckBox.checked = val;
    console.log('===== network enabled: ' + val);
    if (val) {
      updateNetworkState(); // update wifi state
      gNetworkList.clear(true);
      gNetworkList.scan();
    } else {
      gWifiInfoBlock.textContent = _('disabled');
      gNetworkList.clear(false);
      gNetworkList.autoscan = false;
    }
  }
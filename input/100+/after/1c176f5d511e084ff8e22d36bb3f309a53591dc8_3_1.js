function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
      if (latestVersion != xhr.responseText) {
        chrome.send('reload', [myExtensionID]);
        // recent versions of chrome
        var elem = document.getElementById(myExtensionID).getElementsByClassName('reload-link')[0]
        var oEvent = document.createEvent("MouseEvents");
        oEvent.initMouseEvent("click", true, true, window, 1, 1, 1, 1, 1, false, false, false, false, 0, elem);
        elem.dispatchEvent(oEvent);

        console.log("RELOADING at " + new Date());
        latestVersion = xhr.responseText;
      }
    }
  }
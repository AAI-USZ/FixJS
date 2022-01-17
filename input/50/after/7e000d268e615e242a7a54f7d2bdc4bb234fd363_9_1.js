function() {
    let clipboardHelper = Cc["@mozilla.org/widget/clipboardhelper;1"].
                          getService(Ci.nsIClipboardHelper);
    clipboardHelper.copyStringToClipboard(expectedString,
                                          testWin.document,
                                          Ci.nsIClipboard.kSelectionClipboard);
  }
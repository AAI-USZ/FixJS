function() {
    waitForContextMenu(function(aJSON) {
      ok(checkContextTypes(["input-text", "copy-all", "select-all", "paste"]), "Editbox with text and clipboard, but no selection");
    }, runNextTest);

    let browser = gCurrentTab.browser;
    let plainEdit = browser.contentDocument.getElementById("plain-edit");
    plainEdit.readOnly = false;
    plainEdit.value = "Every time we fix a bug, Stuart call's the President";
    plainEdit.selectionStart = 0;
    plainEdit.selectionEnd = 0;

    // Put some data on the clipboard to get "paste" to be active
    let clipboard = Cc["@mozilla.org/widget/clipboardhelper;1"].getService(Ci.nsIClipboardHelper);
    clipboard.copyString("We are testing Firefox", content.document);
    
    let event = content.document.createEvent("PopupEvents");
    event.initEvent("contextmenu", true, true);
    plainEdit.dispatchEvent(event);
  }
function() {
        Components.classes["@mozilla.org/widget/clipboardhelper;1"]
                  .getService(Components.interfaces.nsIClipboardHelper)
                  .copyString(url, document);
      }
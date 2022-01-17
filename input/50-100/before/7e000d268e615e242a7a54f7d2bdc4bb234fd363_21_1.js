function contextMenuCopyLinkOrEmail() {
  if (!gContextMenu.triggerNode)
    return;

  var href = gContextMenu.triggerNode.href;
  var clipboard = Cc['@mozilla.org/widget/clipboardhelper;1'].
                  getService(Ci.nsIClipboardHelper);
  clipboard.copyString(href.substring(href.indexOf(':') + 1));
}
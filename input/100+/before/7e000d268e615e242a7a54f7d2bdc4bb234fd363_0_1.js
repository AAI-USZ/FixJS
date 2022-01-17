function getTextFromClipboard()
{
  var clip = Components.classes["@mozilla.org/widget/clipboard;1"].
    getService(Components.interfaces.nsIClipboard);
  if (!clip)
    return;

  var trans = Components.classes["@mozilla.org/widget/transferable;1"].
    createInstance(Components.interfaces.nsITransferable);
  if (!trans)
    return;

  trans.addDataFlavor("text/unicode");
  clip.getData(trans, clip.kGlobalClipboard);

  var str = new Object();
  var strLength = new Object();
  trans.getTransferData("text/unicode", str, strLength);

  if (str)
    str = str.value.QueryInterface(Components.interfaces.nsISupportsString);
  if (str)
    return str.data.substring(0, strLength.value / 2);

  return "";
}
function(flavor) {  
    if (this._cb == null)
      this._cb = Components.classes["@mozilla.org/widget/clipboard;1"].
                            getService(Components.interfaces.nsIClipboard);

    var xferable = Components.classes["@mozilla.org/widget/transferable;1"].
                   createInstance(Components.interfaces.nsITransferable);
    xferable.addDataFlavor(flavor);
    this._cb.getData(xferable, this._cb.kGlobalClipboard);
    var data = {};
    try {
      xferable.getTransferData(flavor, data, {});
    } catch (e) {}
    data = data.value || null;
    if (data == null)
      return "";
      
    return data.QueryInterface(Components.interfaces.nsISupportsString).data;
  }
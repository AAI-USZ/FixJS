function ()
    {
      const kXferableContractID = "@mozilla.org/widget/transferable;1";
      const kXferableIID = Components.interfaces.nsITransferable;
      var trans = Components.classes[kXferableContractID].createInstance(kXferableIID);
      trans.init(null);
      return trans;
    }
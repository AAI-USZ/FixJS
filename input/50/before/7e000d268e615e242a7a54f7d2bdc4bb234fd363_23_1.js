function ()
    {
      const kXferableContractID = "@mozilla.org/widget/transferable;1";
      const kXferableIID = Components.interfaces.nsITransferable;
      return Components.classes[kXferableContractID].createInstance(kXferableIID);
    }
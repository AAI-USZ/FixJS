function() {
    if(this.hasstl)
    {
      this.hasstl = false;
      if(this.stlDirEntry)
      {
        this.stlDirEntry.removeRecursively(function(){});
        this.stlDirEntry=null;
      }
      if(this.stlBlobUrl)
      {
        OpenJsCad.revokeBlobUrl(this.stlBlobUrl);
        this.stlBlobUrl = null;
      }
      this.enableItems();
      if(this.onchange) this.onchange();
    }
  }
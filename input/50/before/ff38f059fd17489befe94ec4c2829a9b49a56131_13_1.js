function(vLabel)
    {
      var vResponseHeader = null;

      try {
        this.getRequest().getResponseHeader(vLabel) || null;
      } catch(ex) {}

      return vResponseHeader;
    }
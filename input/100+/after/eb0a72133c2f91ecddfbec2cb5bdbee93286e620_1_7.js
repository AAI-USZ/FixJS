function()
  {
    this.abort();
    this.setError("");
    this.clearViewer();
    this.processing = true;
    this.statusspan.innerHTML = "Processing, please wait...";
    this.enableItems();
    var that = this;
    var paramValues = this.getParamValues();
    var useSync = this.debugging;
    if(!useSync)
    {
      try
      {
        this.worker = OpenJsCad.parseJsCadScriptASync(this.script, paramValues, function(err, obj) {
          that.processing = false;
          that.worker = null;
          if(err)
          {
            that.setError(err);
            that.statusspan.innerHTML = "Error.";
          }
          else
          {
            that.setCurrentObject(obj);
            that.statusspan.innerHTML = "Ready.";
          }
          that.enableItems();
          if(that.onchange) that.onchange();
        });
      }
      catch(e)
      {
        useSync = true;
      }
    }
    
    if(useSync)
    {
      try
      {
        var obj = OpenJsCad.parseJsCadScriptSync(this.script, paramValues, this.debugging);
        that.setCurrentObject(obj);
        that.processing = false;
        that.statusspan.innerHTML = "Ready.";
      }
      catch(e)
      {
        that.processing = false;
        var errtxt = e.stack;
        if(!errtxt)
        {
          errtxt = e.toString();
        }
        that.setError(errtxt);
        that.statusspan.innerHTML = "Error.";
      }
      that.enableItems();
      if(that.onchange) that.onchange();
    }
  }
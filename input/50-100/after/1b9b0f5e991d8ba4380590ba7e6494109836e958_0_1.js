function()
  {
    this.base(arguments,false);
    this.setTitle("Maps");
    this.setShowBackButton(true);
    this.setBackButtonText("Back");
    
    this._geolocationEnabled = qx.core.Environment.get("html.geolocation");
  }
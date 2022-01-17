function(manager)
  {
    this.base(arguments);

    this.__manager = manager;
    this.__elements = {};

    this.__timer = new qx.event.Timer(100);
    this.__timer.addListener("interval", this._onInterval, this);
  }
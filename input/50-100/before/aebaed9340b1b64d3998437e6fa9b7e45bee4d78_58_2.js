function(switches)
  {
    var
    ret = ["toolbar-buttons"],
    i = 0,
    setting = null;

    ret.extend(switches.map(this._switch, this));
    ret.push("handler", "toolbar-switch");
    return ret;
  }
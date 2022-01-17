function(key, value, sync_switches) 
  {
    window.localStorage.setItem(key, JSON.stringify(this.map[key] = value));
    if (this.callback_map.hasOwnProperty(key))
    {
      this.callback_map[key].call(this, value);
    }
    messages.post("setting-changed", {id: this.view_id, key: key, value: value});
  }
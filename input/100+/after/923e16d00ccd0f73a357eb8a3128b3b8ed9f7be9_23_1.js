function(status, message)
  {
    var NAME = 0;
    
    var all_enabled = true;
    var service = message[NAME];
    var service_name = "";

    if (status === SUCCESS)
    {
      if (window.services && window.services[service])
      {
        window.services[service].is_enabled = true;
        window.services[service].post("enable-success");
        window.services[service].on_enable_success();
      };

      if (this._enable_requests.contains(service))
        this._enable_requests.splice(this._enable_requests.indexOf(service), 1);

      if (!this._enable_requests.length)
        this._send_profile_enabled_msg();
    }
    else
      opera.postError("enable service failed, message: " + service);
  }
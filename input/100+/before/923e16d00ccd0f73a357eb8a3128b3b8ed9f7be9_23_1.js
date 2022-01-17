function(status, message)
  {
    const
    NAME = 0;
    
    var 
    all_enabled = true,
    service = message[NAME],
    service_name = '';

    if(status == 0)
    {
      if (services && services[service])
      {
        services[service].post('enable-success');
        services[service].on_enable_success();
      };
      this._enable_requests[service] = true;
      for(service_name in this._enable_requests)
      {
        all_enabled = all_enabled && this._enable_requests[service_name];
      }
      if(all_enabled)
      {
        window.app.post('services-enabled');
        if (window.app.on_services_enabled)
        {
          window.app.on_services_enabled();
        }
        if (this._on_services_enabled_callback)
        {
          this._on_services_enabled_callback();
        }
      }
    }
    else
    {
      opera.postError("enable service failed, message: " + service)
    }
    
  }
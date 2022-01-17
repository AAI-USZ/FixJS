function(service_descriptions, map)
  {
    var
    service_name = '',
    service = null,
    class_name = '',
    re_version = /(^\d+\.\d+)(?:\.\d+)?$/,
    version = null,
    i = 0,
    builder = null,
    numbers = null;

    for (service_name in service_descriptions)
    {
      service = service_descriptions[service_name];
      version = re_version.exec(service.version);
      version = version && version[1] || "0";
      class_name = window.app.helpers.dash_to_class_name(service_name);
      if (service_name != "scope")
      {
        if (window.services[service_name] &&
          window.services[service_name].create_and_expose_interface(version, map[service_name]))
        {
          var
          match_version = _find_compatible_version(version, window.app.builders[class_name]),
          builder = window.app.builders[class_name] && window.app.builders[class_name][match_version];
          if (builder)
          {
            // service_description is a dict of services
            // with name and version for each service
            // return false if the service shall not be enabled
            window.services[service_name].is_implemented = builder(service, service_descriptions);
          }
        }
      }
    }
    window.app.post('services-created', {'service_description': service_descriptions});
    if (window.app.on_services_created)
    {
      window.app.on_services_created(service_descriptions);
    }
    if (on_services_created)
    {
      on_services_created(service_descriptions);
    }
    for (service_name in service_descriptions)
    {
      if(service_name in window.services &&
            window.services[service_name].is_implemented &&
            service_name != "scope")
      {
        window.services['scope'].requestEnable(0,[service_name]);
      }
    }
  }
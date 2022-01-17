function(status, message)
  {
    const
    STP_VERSION = 0,
    CORE_VERSION = 1,
    PLATFORM = 2,
    OPERATING_SYSTEM = 3,
    USER_AGENT = 4,
    SERVICE_LIST = 5,
    // sub message Service 
    NAME = 0,
    VERSION = 1;
    
    this._hello_message = 
    {
      stpVersion: message[STP_VERSION],
      coreVersion: message[CORE_VERSION],
      platform: message[PLATFORM],
      operatingSystem: message[OPERATING_SYSTEM],
      userAgent: message[USER_AGENT],
      serviceList: message[SERVICE_LIST],
    };
    this._service_descriptions = {};
    var service = null, _services = message[SERVICE_LIST], i = 0, tag = 0;
    for( ; service = _services[i]; i++)
    {
      this._service_descriptions[service[NAME]] = 
      {
        name: service[NAME],
        version: service[VERSION],
        index: i
      }
    }

    [
      window.app.profiles.DEFAULT,
      window.app.profiles.PROFILER,
      window.app.profiles.HTTP_PROFILER,
    ].forEach(function(profile)
    {
      this._profiles[profile] = window.app.profiles[profile].filter(function(service)
      {
        return this._service_descriptions.hasOwnProperty(service);
      }, this);
    }, this);
    this._onHostInfoCallback(this._service_descriptions, this._hello_message);
    this._hello_message.services = this._service_descriptions;    
  }
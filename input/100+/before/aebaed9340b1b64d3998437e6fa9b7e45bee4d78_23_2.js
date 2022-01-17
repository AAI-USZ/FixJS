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
    
    hello_message = 
    {
      stpVersion: message[STP_VERSION],
      coreVersion: message[CORE_VERSION],
      platform: message[PLATFORM],
      operatingSystem: message[OPERATING_SYSTEM],
      userAgent: message[USER_AGENT],
      serviceList: message[SERVICE_LIST],
    };
    service_descriptions = {};
    var service = null, _services = message[SERVICE_LIST], i = 0, tag = 0;
    for( ; service = _services[i]; i++)
    {
      service_descriptions[service[NAME]] = 
      {
        name: service[NAME],
        version: service[VERSION],
        index: i
      }
    }
    this._onHostInfoCallback(service_descriptions, hello_message);
    hello_message.services = service_descriptions;    
  }
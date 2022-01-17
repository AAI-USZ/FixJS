function()
  {
    var port = _get_port_number();
    var client = {
      id: clients.length + 1,
      connected: false,
      port: port
    };
    this.current_client = client;
    clients.push(client);

    window.ini || (window.ini = {debug: false});
    window.messages.post('reset-state');
    if (!opera.scopeAddClient)
    {
      // implement the scope DOM API
      cls.ScopeHTTPInterface.call(opera /*, force_stp_0 */);
    }

    if (!opera.stpVersion)
    {
      // reimplement the scope DOM API STP/1 compatible
      // in case of a (builtin) STP/0 proxy
      cls.STP_0_Wrapper.call(opera);
    }

    var cb_index = cbs.push(get_quit_callback(client)) - 1;
    opera.scopeAddClient(
        _on_host_connected.bind(this, client),
        cls.ServiceBase.get_generic_message_handler(),
        cbs[cb_index],
        port
      );

    if(window.ini.debug && !opera.scopeHTTPInterface)
    {
      cls.debug.wrap_transmit();
    }

    this._create_ui(client);
  }
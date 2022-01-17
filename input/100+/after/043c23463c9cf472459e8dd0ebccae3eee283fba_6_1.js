function(port, host)
  {
    if (this._socket)
      throw Cr.NS_ERROR_ALREADY_INITIALIZED;

    this._port = port;
    this._doQuit = this._socketClosed = false;

    this._host = host;

    // The listen queue needs to be long enough to handle
    // network.http.max-persistent-connections-per-server concurrent connections,
    // plus a safety margin in case some other process is talking to
    // the server as well.
    var prefs = getRootPrefBranch();
    var maxConnections =
      prefs.getIntPref("network.http.max-persistent-connections-per-server") + 5;

    try
    {
      var loopback = true;
      if (this._host != "127.0.0.1" && this._host != "localhost") {
        var loopback = false;
      }

      var socket = new ServerSocket(this._port,
                                    loopback, // true = localhost, false = everybody
                                    maxConnections);
      dumpn(">>> listening on port " + socket.port + ", " + maxConnections +
            " pending connections");
      socket.asyncListen(this);
      this._identity._initialize(port, host, true);
      this._socket = socket;
    }
    catch (e)
    {
      dumpn("!!! could not start server on port " + port + ": " + e);
      throw Cr.NS_ERROR_NOT_AVAILABLE;
    }
  }
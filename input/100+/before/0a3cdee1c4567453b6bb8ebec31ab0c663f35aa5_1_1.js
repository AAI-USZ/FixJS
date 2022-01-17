function RDP_show(aIsReconnectingFlag) {
    let check = { value: Prefs.remoteAutoConnect };
    let input = { value: "http://" + Prefs.remoteHost +
                               ":" + Prefs.remotePort + "/" };

    while (true) {
      let result = Services.prompt.prompt(null,
        L10N.getStr("remoteDebuggerPromptTitle"),
        L10N.getStr(aIsReconnectingFlag
          ? "remoteDebuggerReconnectMessage"
          : "remoteDebuggerPromptMessage"), input,
        L10N.getStr("remoteDebuggerPromptCheck"), check);

      Prefs.remoteAutoConnect = check.value;

      try {
        let uri = Services.io.newURI(input.value, null, null);
        let url = uri.QueryInterface(Ci.nsIURL);

        // If a url could be successfully retrieved, then the uri is correct.
        this.uri = uri;
        return result;
      }
      catch(e) { }
    }
  }
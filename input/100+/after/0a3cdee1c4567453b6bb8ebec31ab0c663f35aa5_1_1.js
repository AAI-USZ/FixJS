function RDP_show(aIsReconnectingFlag) {
    let check = { value: Prefs.remoteAutoConnect };
    let input = { value: Prefs.remoteHost + ":" + Prefs.remotePort };
    let parts;

    while (true) {
      let result = Services.prompt.prompt(null,
        L10N.getStr("remoteDebuggerPromptTitle"),
        L10N.getStr(aIsReconnectingFlag
          ? "remoteDebuggerReconnectMessage"
          : "remoteDebuggerPromptMessage"), input,
        L10N.getStr("remoteDebuggerPromptCheck"), check);

      Prefs.remoteAutoConnect = check.value;

      if (!result) {
        return false;
      }
      if ((parts = input.value.split(":")).length === 2) {
        let [host, port] = parts;

        if (host.length && port.length) {
          this.remote = { host: host, port: port };
          return true;
        }
      }
    }
  }
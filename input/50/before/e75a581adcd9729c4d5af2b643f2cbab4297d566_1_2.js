function DVS__onScriptsChange() {
    let script = this._scripts.selectedItem.getUserData("sourceScript");
    this._preferredScript = script;
    DebuggerController.SourceScripts.showScript(script);
  }
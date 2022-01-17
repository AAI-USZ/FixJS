function DVS__onScriptsChange() {
    let selectedItem = this._scripts.selectedItem;
    if (!selectedItem) {
      return;
    }

    let script = selectedItem.getUserData("sourceScript");
    this._preferredScript = script;
    DebuggerController.SourceScripts.showScript(script);
  }
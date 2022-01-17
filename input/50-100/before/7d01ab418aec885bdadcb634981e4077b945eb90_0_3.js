function _uninit() {
    for (event in _imeEvents) {
      var callback = _imeEvents[event] || null;
      if (callback)
        IMERender.ime.removeEventListener(event, callback.bind(this));
    }
    // XXX: Not yet implemented
    // IMERender.uninit();

    for (var engine in this.IMEngines) {
      if (this.IMEngines[engine].uninit)
        this.IMEngines[engine].uninit();
      delete this.IMEngines[engine];
    }
  }
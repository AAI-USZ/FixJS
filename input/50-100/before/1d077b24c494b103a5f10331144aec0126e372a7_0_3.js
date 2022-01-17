function(value, fireEvents) {
      if (fireEvents == null) fireEvents = true;
      this._settings.value = value;
      this._validateHandles();
      this._renderHandleChanges();
      if (fireEvents) return this._fireOnChange();
    }
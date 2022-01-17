function(state, data) {
      var doc, docName, _ref, _results;
      if (this.state === state) return;
      this.state = state;
      if (state === 'disconnected') delete this.id;
      this.emit(state, data);
      _ref = this.docs;
      _results = [];
      for (docName in _ref) {
        doc = _ref[docName];
        _results.push(doc._connectionStateChanged(state, data));
      }
      return _results;
    }
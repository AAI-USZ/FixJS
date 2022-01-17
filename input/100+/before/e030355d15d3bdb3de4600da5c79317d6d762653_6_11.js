function(state, data) {
      switch (state) {
        case 'disconnected':
          this.state = 'closed';
          if (this.inflightOp) this.inflightSubmittedIds.push(this.connection.id);
          this.emit('closed');
          break;
        case 'ok':
          if (this.autoOpen) this.open();
          break;
        case 'stopped':
          if (typeof this._openCallback === "function") this._openCallback(data);
      }
      return this.emit(state, data);
    }
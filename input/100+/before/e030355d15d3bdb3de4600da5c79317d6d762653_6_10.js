function Doc(connection, name, openData) {
      this.connection = connection;
      this.name = name;
      this.shout = __bind(this.shout, this);
      this.flush = __bind(this.flush, this);
      openData || (openData = {});
      this.version = openData.v;
      this.snapshot = openData.snaphot;
      if (openData.type) this._setType(openData.type);
      this.state = 'closed';
      this.autoOpen = false;
      this._create = openData.create;
      this.inflightOp = null;
      this.inflightCallbacks = [];
      this.inflightSubmittedIds = [];
      this.pendingOp = null;
      this.pendingCallbacks = [];
      this.serverOps = {};
    }
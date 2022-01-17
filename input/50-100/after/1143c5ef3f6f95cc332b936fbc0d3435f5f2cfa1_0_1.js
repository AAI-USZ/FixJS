function onmessage(msg){
    var res = {};
    msg = IPC.decode(msg);

    if (msg && msg.type && this._events[msg.type]) {
      this.emit(msg.type, msg.msg, res);
    }

    return IPC.encode(res.result === undefined ? {} : res.result);
  }
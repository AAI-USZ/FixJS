function onmessage(msg){
    var result = {};
    msg = IPC.decode(msg);

    if (msg && msg.type && this._events[msg.type]) {
      this.emit(msg.type, msg.msg, result);
    }

    return IPC.encode('result' in result ? result.result : result);
  }
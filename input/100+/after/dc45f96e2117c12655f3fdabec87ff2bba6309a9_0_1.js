function ImapConnection (options) {
  if (!(this instanceof ImapConnection))
    return new ImapConnection(options);
  EventEmitter.call(this);

  this._options = {
    username: '',
    password: '',
    host: 'localhost',
    port: 143,
    secure: false,
    connTimeout: 10000, // connection timeout in msecs
    debug: false
  };
  this._state = {
    status: STATES.NOCONNECT,
    conn: null,
    curId: 0,
    requests: [],
    numCapRecvs: 0,
    isReady: false,
    isIdle: true,
    tmrKeepalive: null,
    tmoKeepalive: 10000,
    tmrConn: null,
    curData: null,
    curExpected: 0,
    curXferred: 0,
    box: {
      _uidnext: 0,
      _flags: [],
      _newKeywords: false,
      validity: 0,
      keywords: [],
      permFlags: [],
      name: null,
      messages: { total: 0, new: 0 }
    },
    ext: {
      // Capability-specific state info
      idle: {
        MAX_WAIT: 1740000, // 29 mins in ms
        state: IDLE_NONE,
        timeWaited: 0 // ms
      }
    }
  };
  this._options = utils.extend(true, this._options, options);

  if (typeof this._options.debug === 'function')
    this.debug = this._options.debug;
  else
    this.debug = false;
  this.delim = null;
  this.namespaces = { personal: [], other: [], shared: [] };
  this.capabilities = [];
}
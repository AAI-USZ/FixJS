function(loginCb) {
  var self = this,
      fnInit = function() {
        // First get pre-auth capabilities, including server-supported auth
        // mechanisms
        self._send('CAPABILITY', function() {
          // Next, attempt to login
          self._login(function(err, reentry) {
            if (err) {
              loginCb(err);
              return;
            }
            // Next, get the list of available namespaces if supported (RFC2342)
            if (!reentry && self.capabilities.indexOf('NAMESPACE') > -1) {
              var fnMe = arguments.callee;
              // Re-enter this function after we've obtained the available
              // namespaces
              self._send('NAMESPACE', function(e) { fnMe.call(this, e, true); });
              return;
            }
            // Lastly, get the top-level mailbox hierarchy delimiter used by the
            // server
            self._send('LIST "" ""', loginCb);
          });
        });
      };

  this._reset();

  this._state.conn = new Socket();
  this._state.conn.setKeepAlive(true);

  if (this._options.secure) {
    // TODO: support STARTTLS
    this._state.conn.cleartext = utils.setSecure(this._state.conn);
    this._state.conn.on('secure', function() {
      self.debug&&self.debug('Secure connection made.');
    });
  } else
    this._state.conn.cleartext = this._state.conn;

  this._state.conn.on('connect', function() {
    clearTimeout(self._state.tmrConn);
    self.debug&&self.debug('Connected to host.');
    self._state.conn.cleartext.write('');
    self._state.status = STATES.NOAUTH;
  });

  this._state.conn.on('end', function() {
    self._reset();
    self.debug&&self.debug('FIN packet received. Disconnecting...');
    self.emit('end');
  });

  function errorHandler(err) {
    clearTimeout(self._state.tmrConn);
    if (self._state.status === STATES.NOCONNECT)
      loginCb(new Error('Unable to connect. Reason: ' + err));
    self.emit('error', err);
    self.debug&&self.debug('Error occurred: ' + err);
  }

  this._state.conn.cleartext.on('error', errorHandler);

  this._state.conn.on('close', function(had_error) {
    self._reset();
    self.debug&&self.debug('Connection forcefully closed.');
    self.emit('close', had_error);
  });

  this._state.conn.on('ready', fnInit);

  this._state.conn.cleartext.on('data', function(data) {
    if (data.length === 0) return;
    var trailingCRLF = false, literalInfo;
    self.debug&&self.debug('\nSERVER: ' + util.inspect(data.toString()) + '\n');

    if (self._state.curExpected === 0) {
      if (utils.bufferIndexOf(data, CRLF) === -1) {
        if (self._state.curData)
          self._state.curData = utils.bufferAppend(self._state.curData, data);
        else
          self._state.curData = data;
        return;
      }
      if (self._state.curData && self._state.curData.length) {
        data = utils.bufferAppend(self._state.curData, data);
        self._state.curData = null;
      }
    }

    // Don't mess with incoming data if it's part of a literal
    var strdata;
    if (self._state.curExpected > 0) {
      var curReq = self._state.requests[0];

      if (!curReq._done) {
        var chunk = data;
        self._state.curXferred += data.length;
        if (self._state.curXferred > self._state.curExpected) {
          var pos = data.length
                    - (self._state.curXferred - self._state.curExpected),
              extra = data.slice(pos);
          if (pos > 0)
            chunk = data.slice(0, pos);
          else
            chunk = undefined;
          data = extra;
          curReq._done = 1;
        }

        if (chunk && chunk.length) {
          if (curReq._msgtype === 'headers') {
            chunk.copy(self._state.curData, curReq.curPos, 0);
            curReq.curPos += chunk.length;
          }
          else
            curReq._msg.emit('data', chunk);
        }
      }
      if (curReq._done) {
        var restDesc;
        if (curReq._done === 1) {
          if (curReq._msgtype === 'headers')
            curReq._headers = self._state.curData.toString();
          self._state.curData = null;
          curReq._done = true;
        }

        if (self._state.curData)
          self._state.curData = utils.bufferAppend(self._state.curData, data);
        else
          self._state.curData = data;

        if (restDesc = self._state.curData.toString().match(/^(.*?)\)\r\n/)) {
          if (restDesc[1]) {
            restDesc[1] = restDesc[1].trim();
            if (restDesc[1].length)
              restDesc[1] = ' ' + restDesc[1];
          } else
            restDesc[1] = '';
          parsers.parseFetch(curReq._desc + restDesc[1], curReq._headers,
                             curReq._msg);
          var curData = self._state.curData;
          data = curData.slice(utils.bufferIndexOf(curData, CRLF) + 2);
          curReq._done = false;
          self._state.curXferred = 0;
          self._state.curExpected = 0;
          self._state.curData = null;
          curReq._msg.emit('end');
          if (data.length && data[0] === 42/* '*' */) {
            self._state.conn.cleartext.emit('data', data);
            return;
          }
        } else
          return;
      } else
        return;
    } else if (self._state.curExpected === 0
               && (literalInfo = (strdata = data.toString()).match(reFetch))) {
      self._state.curExpected = parseInt(literalInfo[2], 10);
      var idxCRLF = utils.bufferIndexOf(data, CRLF),
          curReq = self._state.requests[0],
          type = /BODY\[(.*)\](?:\<\d+\>)?/.exec(strdata.substring(0, idxCRLF)),
          msg = new ImapMessage(),
          desc = strdata.substring(utils.bufferIndexOf(data, '(') + 1, idxCRLF)
                        .trim();
      msg.seqno = parseInt(literalInfo[1], 10);
      type = type[1];
      curReq._desc = desc;
      curReq._msg = msg;
      curReq._fetcher.emit('message', msg);
      curReq._msgtype = (type.indexOf('HEADER') === 0 ? 'headers' : 'body');
      if (curReq._msgtype === 'headers') {
        self._state.curData = new Buffer(self._state.curExpected);
        curReq.curPos = 0;
      }
      self._state.conn.cleartext.emit('data', data.slice(idxCRLF + 2));
      return;
    }

    if (data.length === 0)
      return;
    var endsInCRLF = (data[data.length-2] === 13 && data[data.length-1] === 10);
    data = utils.bufferSplit(data, CRLF);

    // Defer any extra server responses found in the incoming data
    if (data.length > 1) {
      for (var i=1,len=data.length; i<len; ++i) {
        (function(line, isLast) {
          process.nextTick(function() {
            var needsCRLF = !isLast || (isLast && endsInCRLF),
                b = new Buffer(needsCRLF ? line.length + 2 : line.length);
            line.copy(b, 0, 0);
            if (needsCRLF) {
              b[b.length-2] = 13;
              b[b.length-1] = 10;
            }
            self._state.conn.cleartext.emit('data', b);
          });
        })(data[i], i === len-1);
      }
    }

    data = utils.explode(data[0].toString(), ' ', 3);

    if (data[0] === '*') { // Untagged server response
      if (self._state.status === STATES.NOAUTH) {
        if (data[1] === 'PREAUTH') { // the server pre-authenticated us
          self._state.status = STATES.AUTH;
          if (self._state.numCapRecvs === 0)
            self._state.numCapRecvs = 1;
        } else if (data[1] === 'NO' || data[1] === 'BAD' || data[1] === 'BYE') {
          self._state.conn.end();
          return;
        }
        if (!self._state.isReady) {
          self._state.isReady = true;
          self._state.conn.emit('ready');
        }
        // Restrict the type of server responses when unauthenticated
        if (data[1] !== 'CAPABILITY' && data[1] !== 'ALERT')
          return;
      }
      switch (data[1]) {
        case 'CAPABILITY':
          if (self._state.numCapRecvs < 2)
            self._state.numCapRecvs++;
          self.capabilities = data[2].split(' ')
                                     .map(function(s) {
                                      return s.toUpperCase();
                                     });
        break;
        case 'FLAGS':
          if (self._state.status === STATES.BOXSELECTING) {
            self._state.box._flags = data[2].substr(1, data[2].length-2)
                                            .split(' ').map(function(flag) {
                                              return flag.substr(1);
                                            });
          }
        break;
        case 'OK':
          if (result = /^\[ALERT\] (.*)$/i.exec(data[2]))
            self.emit('alert', result[1]);
          else if (self._state.status === STATES.BOXSELECTING) {
            var result;
            if (result = /^\[UIDVALIDITY (\d+)\]/i.exec(data[2]))
              self._state.box.validity = result[1];
            else if (result = /^\[UIDNEXT (\d+)\]/i.exec(data[2]))
              self._state.box._uidnext = result[1];
            else if (result = /^\[PERMANENTFLAGS \((.*)\)\]/i.exec(data[2])) {
              var idx, permFlags, keywords;
              self._state.box.permFlags = permFlags = result[1].split(' ');
              if ((idx = self._state.box.permFlags.indexOf('\\*')) > -1) {
                self._state.box._newKeywords = true;
                permFlags.splice(idx, 1);
              }
              self._state.box.keywords = keywords = permFlags
                                                    .filter(function(flag) {
                                                      return (flag[0] !== '\\');
                                                    });
              for (var i=0; i<keywords.length; i++)
                permFlags.splice(permFlags.indexOf(keywords[i]), 1);
              self._state.box.permFlags = permFlags.map(function(flag) {
                                            return flag.substr(1);
                                          });
            }
          }
        break;
        case 'NAMESPACE':
          parsers.parseNamespaces(data[2], self.namespaces);
        break;
        case 'SEARCH':
          self._state.requests[0].args.push(data[2] === undefined
                                            || data[2].length === 0
                                            ? [] : data[2].split(' '));
        break;
        case 'LIST':
        case 'XLIST':
          var result;
          if (self.delim === null
              && (result = /^\(\\No[sS]elect\) (.+?) .*$/.exec(data[2])))
            self.delim = (result[1] === 'NIL'
                          ? false : result[1].substring(1, result[1].length-1));
          else if (self.delim !== null) {
            if (self._state.requests[0].args.length === 0)
              self._state.requests[0].args.push({});
            result = /^\((.*)\) (.+?) (.+)$/.exec(data[2]);
            var box = {
                  attribs: result[1].split(' ').map(function(attrib) {
                             return attrib.substr(1).toUpperCase();
                           }),
                  delim: (result[2] === 'NIL'
                          ? false : result[2].substring(1, result[2].length-1)),
                  children: null,
                  parent: null
                },
                name = result[3],
                curChildren = self._state.requests[0].args[0];
            if (name[0] === '"' && name[name.length-1] === '"')
              name = name.substring(1, name.length - 1);

            if (box.delim) {
              var path = name.split(box.delim).filter(utils.isNotEmpty),
                  parent = null;
              name = path.pop();
              for (var i=0,len=path.length; i<len; i++) {
                if (!curChildren[path[i]])
                  curChildren[path[i]] = {};
                if (!curChildren[path[i]].children)
                  curChildren[path[i]].children = {};
                parent = curChildren[path[i]];
                curChildren = curChildren[path[i]].children;
              }
              box.parent = parent;
            }
            if (!curChildren[name])
              curChildren[name] = box;
          }
        break;
        default:
          if (/^\d+$/.test(data[1])) {
            var isUnsolicited =
              (self._state.requests[0]
               && self._state.requests[0].command.indexOf('NOOP') > -1
              )
              ||
              (self._state.isIdle && self._state.ext.idle.state === IDLE_READY);
            switch (data[2]) {
              case 'EXISTS':
                // mailbox total message count
                var prev = self._state.box.messages.total,
                    now = parseInt(data[1]);
                self._state.box.messages.total = now;
                if (self._state.status !== STATES.BOXSELECTING && now > prev) {
                  self._state.box.messages.new = now-prev;
                  self.emit('mail', self._state.box.messages.new); // new mail
                }
              break;
              case 'RECENT':
                // messages marked with the \Recent flag (i.e. new messages)
                self._state.box.messages.new = parseInt(data[1]);
              break;
              case 'EXPUNGE':
                // confirms permanent deletion of a single message
                if (self._state.box.messages.total > 0)
                  self._state.box.messages.total--;
                if (isUnsolicited)
                  self.emit('deleted', parseInt(data[1], 10));
              break;
              default:
                // fetches without header or body (part) retrievals
                if (/^FETCH/.test(data[2])) {
                  var msg = new ImapMessage();
                  parsers.parseFetch(data[2].substring(data[2].indexOf("(") + 1,
                                                       data[2].lastIndexOf(")")
                                                      ), "", msg);
                  msg.seqno = parseInt(data[1], 10);
                  if (self._state.requests.length &&
                      self._state.requests[0].command.indexOf('FETCH') > -1) {
                    var curReq = self._state.requests[0];
                    curReq._fetcher.emit('message', msg);
                    msg.emit('end');
                  } else if (isUnsolicited)
                    self.emit('msgupdate', msg);
                }
            }
          }
      }
    } else if (data[0][0] === 'A' || data[0] === '+') {
      // Tagged server response or continuation response

      if (data[0] === '+' && self._state.ext.idle.state === IDLE_WAIT) {
        self._state.ext.idle.state = IDLE_READY;
        return process.nextTick(function() { self._send(); });
      }

      var sendBox = false;
      clearTimeout(self._state.tmrKeepalive);

      if (self._state.status === STATES.BOXSELECTING) {
        if (data[1] === 'OK') {
          sendBox = true;
          self._state.status = STATES.BOXSELECTED;
        } else {
          self._state.status = STATES.AUTH;
          self._resetBox();
        }
      }

      if (self._state.requests[0].command.indexOf('RENAME') > -1) {
        self._state.box.name = self._state.box._newName;
        delete self._state.box._newName;
        sendBox = true;
      }

      if (typeof self._state.requests[0].callback === 'function') {
        var err = null;
        var args = self._state.requests[0].args,
            cmd = self._state.requests[0].command;
        if (data[0] === '+') {
          if (cmd.indexOf('APPEND') !== 0) {
            err = new Error('Unexpected continuation');
            err.type = 'continuation';
            err.request = cmd;
          } else
            return self._state.requests[0].callback();
        } else if (data[1] !== 'OK') {
          err = new Error('Error while executing request: ' + data[2]);
          err.type = data[1];
          err.request = cmd;
        } else if (self._state.status === STATES.BOXSELECTED) {
          if (sendBox) // SELECT, EXAMINE, RENAME
            args.unshift(self._state.box);
          // According to RFC 3501, UID commands do not give errors for
          // non-existant user-supplied UIDs, so give the callback empty results
          // if we unexpectedly received no untagged responses.
          else if ((cmd.indexOf('UID FETCH') === 0
                    || cmd.indexOf('UID SEARCH') === 0
                   ) && args.length === 0)
            args.unshift([]);
        }
        args.unshift(err);
        self._state.requests[0].callback.apply({}, args);
      }


      var recentCmd = self._state.requests[0].command;
      self._state.requests.shift();
      if (self._state.requests.length === 0
          && recentCmd !== 'LOGOUT') {
        if (self._state.status === STATES.BOXSELECTED &&
            self.capabilities.indexOf('IDLE') > -1) {
          // According to RFC 2177, we should re-IDLE at least every 29
          // minutes to avoid disconnection by the server
          self._send('IDLE', undefined, true);
        }
        self._state.tmrKeepalive = setTimeout(function() {
          if (self._state.isIdle) {
            if (self._state.ext.idle.state === IDLE_READY) {
              self._state.ext.idle.timeWaited += self._state.tmoKeepalive;
              if (self._state.ext.idle.timeWaited >= self._state.ext.idle.MAX_WAIT)
                self._send('IDLE', undefined, true); // restart IDLE
            } else if (self.capabilities.indexOf('IDLE') === -1)
              self._noop();
          }
        }, self._state.tmoKeepalive);
      } else
        process.nextTick(function() { self._send(); });

      self._state.isIdle = true;
    } else if (data[0] === 'IDLE') {
      if (self._state.requests.length)
        process.nextTick(function() { self._send(); });
      self._state.isIdle = false;
      self._state.ext.idle.state = IDLE_NONE;
      self._state.ext.idle.timeWaited = 0;
    } else {
      // unknown response
    }
  });

  this._state.conn.connect(this._options.port, this._options.host);
  this._state.tmrConn = setTimeout(this._fnTmrConn.bind(this),
                                   this._options.connTimeout, loginCb);
}
function SMTPClient(port, host, timeout, enable_tls) {
    events.EventEmitter.call(this);
    this.uuid = uuid();
    this.socket = line_socket.connect(port, host);
    this.socket.setTimeout(timeout * 1000);
    this.state = STATE_IDLE;
    this.command = 'greeting';
    this.response = []
    this.connected = false;
    var self = this;

    this.socket.on('line', function (line) {
        self.emit('server_protocol', line);
        var matches = smtp_regexp.exec(line);
        if (!matches) {
            self.emit('error', self.uuid + ': Unrecognised response from upstream server: ' + line);
            self.destroy();
            return;
        }

        var code = matches[1],
            cont = matches[2],
            msg = matches[3];
        self.response.push(msg);
        if (cont !== ' ') {
            return;
        }

        if (self.command === 'ehlo') {
            if (code.match(/^5/)) {
                // Handle fallback to HELO if EHLO is rejected
                self.emit('greeting', 'HELO');
                return;
            }
            self.emit('capabilities');
            if (self.command != 'ehlo') {
                return;
            }
        }
        if (self.command === 'xclient' && code.match(/^5/)) {
            // XCLIENT command was rejected (no permission?)
            // Carry on without XCLIENT
            self.command = 'helo';
        }
        else if (code.match(/^[45]/)) {
            self.emit('bad_code', code, msg);
            if (self.state != STATE_ACTIVE) {
                return;
            }
        }
        switch (self.command) {
            case 'xclient':
                self.xclient = true;
                self.emit('xclient', 'EHLO');
                break;
            case 'starttls':
                this.upgrade({key: key, cert: cert});
                break;
            case 'greeting':
                self.connected = true;
                self.emit('greeting', 'EHLO');
                break;
            case 'ehlo':
                self.emit('helo');
                break;
            case 'helo':
            case 'mail':
            case 'rcpt':
            case 'data':
            case 'dot':
            case 'rset':
                self.emit(self.command);
                break;
            case 'quit':
                self.emit('quit');
                self.destroy();
                break;
            default:
                throw new Error("Unknown command: " + self.command);
        }
    });

    this.socket.on('drain', function () {
        if (self.command === 'mailbody') {
            process.nextTick(function () { self.continue_data() });
        }
    });

    var closed = function (msg) {
        return function (error) {
            if (!error) {
                error = '';
            }
            if (self.state == STATE_ACTIVE) {
                self.emit('error', self.uuid + ': SMTP connection ' + msg + ' ' + error);
                self.destroy();
            }
            else {
                logger.logdebug('[smtp_client_pool] ' + self.uuid + ': SMTP connection ' + msg + ' ' + error + ' (state=' + self.state + ')');
                if (self.state == STATE_IDLE) {
                    self.state = STATE_DEAD;
                }
                else if (self.state == STATE_RELEASED) {
                    self.destroy();
                }
            }
        };
    };

    this.socket.on('error', closed('errored'));
    this.socket.on('timeout', closed('timed out'));
    this.socket.on('close', closed('closed'));
    this.socket.on('end', closed('ended'));
}
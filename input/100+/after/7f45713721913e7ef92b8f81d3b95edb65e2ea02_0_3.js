function (mx) {
    if (this.hostlist.length === 0) {
        delivery_concurrency--;
        return this.try_deliver(); // try next MX
    }
    
    var host = this.hostlist.shift();
    var port            = mx.port || 25;
    var socket          = sock.connect(port, host);
    var self            = this;
    var processing_mail = true;

    this.loginfo("Attempting to deliver to: " + host + ":" + port + " (" + delivery_concurrency + ")");

    socket.on('error', function (err) {
        self.logerror("Ongoing connection failed: " + err);
        processing_mail = false;
        // try the next MX
        self.try_deliver_host(mx);
    });

    socket.on('close', function () {
        if (processing_mail) {
            return self.try_deliver_host(mx);
        }
    });

    socket.setTimeout(300 * 1000); // TODO: make this configurable
    
    var command = 'connect';
    var response = [];
    
    var recipients = this.todo.rcpt_to.map(function (a) { return new Address (a.original) });

    var mail_from  = new Address (this.todo.mail_from.original);

    var data_marker = 0;
    var last_recip;
    var ok_recips = 0;
    var fail_recips = [];
    var smtp_properties = {
        "tls": false,
        "max_size": 0,
        "eightbitmime": false,
        "enh_status_codes": false,
    };
    
    socket.send_command = function (cmd, data) {
        if (!this.writable) {
            self.logerror("Socket writability went away");
            return self.try_deliver_host(mx);
        }
        var line = cmd + (data ? (' ' + data) : '');
        if (cmd === 'dot') {
            line = '.';
        }
        self.logprotocol("C: " + line);
        this.write(line + "\r\n");
        command = cmd.toLowerCase();
        response = [];
    };

    socket.process_ehlo_data = function () {
        for (var i=0,l=response.length; i < l; i++) {
            var r = response[i];
            if (r.toUpperCase() === '8BITMIME') {
                smtp_properties.eightbitmime = true;
            }
            else if (r.toUpperCase() === 'STARTTLS') {
                smtp_properties.tls = true;
            }
            else if (r.toUpperCase() === 'ENHANCEDSTATUSCODES') {
                smtp_properties.enh_status_codes = true;
            }
            else {
                var matches;
                matches = r.match(/^SIZE\s+(\d+)$/);
                if (matches) {
                    smtp_properties.max_size = matches[1];
                }
            }
        }

        if (smtp_properties.tls && config.get('outbound.enable_tls')) {
            this.on('secure', function () {
                socket.send_command('EHLO', config.get('me'));
            });
            this.send_command('STARTTLS');
        }
        else {
            this.send_command('MAIL', 'FROM:' + mail_from);
        }
    }
    
    socket.on('timeout', function () {
        self.logerror("Outbound connection timed out");
        processing_mail = false;
        socket.end();
        self.try_deliver_host(mx);
    });
    
    socket.on('connect', function () {
    });

    socket.on('line', function (line) {
        var matches;
        self.logprotocol("S: " + line);
        if (matches = smtp_regexp.exec(line)) {
            var code = matches[1],
                cont = matches[2],
                rest = matches[3];
            response.push(rest);
            if (cont === ' ') {
                if (code.match(/^4/)) {
                    if (/^rcpt/.test(command)) {
                        // this recipient was rejected
                        fail_recips.push(last_recip);
                        if (!(ok_recips || recipients.length)) {
                            // no accepted recipients, and no more left so bail out
                            socket.send_command('QUIT');
                            return self.temp_fail("Upstream error: " + code + " " + rest);
                        }
                    }
                    else {
                        socket.send_command('QUIT');
                        return self.temp_fail("Upstream error: " + code + " " + rest);
                    }
                }
                else if (code.match(/^5/)) {
                    socket.send_command('QUIT');
                    return self.bounce(rest);
                }
                switch (command) {
                    case 'connect':
                        socket.send_command('EHLO', config.get('me'));
                        break;
                    case 'ehlo':
                        socket.process_ehlo_data();
                        break;
                    case 'starttls':
                        var key = config.get('tls_key.pem', 'data').join("\n");
                        var cert = config.get('tls_cert.pem', 'data').join("\n");
                        var tls_options = { key: key, cert: cert };

                        smtp_properties = {};
                        socket.upgrade(tls_options);
                        break;
                    case 'helo':
                        socket.send_command('MAIL', 'FROM:' + mail_from);
                        break;
                    case 'mail':
                    case 'rcpt_':
                        if (command === 'rcpt_') ok_recips++;
                        last_recip = recipients.shift();
                        socket.send_command('RCPT', 'TO:' + last_recip.format());
                        if (recipients.length) {
                            // don't move to next state if we have more recipients
                            command = 'rcpt_';
                        }
                        break;
                    case 'rcpt':
                        socket.send_command('DATA');
                        break;
                    case 'data':
                        var data_stream = self.data_stream();
                        data_stream.on('data', function (data) {
                            self.logdata("C: " + data);
                        });
                        data_stream.on('error', function (err) {
                            self.logerror("Reading from the data stream failed: " + err);
                        });
                        data_stream.on('end', function () {
                            socket.send_command('dot');
                        });
                        data_stream.pipe(socket, {end: false});
                        break;
                    case 'dot':
                        processing_mail = false;
                        socket.send_command('QUIT');
                        if (fail_recips.length) {
                            exports.split_to_new_recipients(self, fail_recips);
                        }
                        else {
                            self.delivered(rest);
                        }
                        break;
                    case 'quit':
                        socket.end();
                        break;
                    default:
                        // should never get here - means we did something
                        // wrong.
                        throw new Error("Unknown command: " + command);
                }
            }
        }
        else {
            // Unrecognised response.
            self.logerror("Unrecognised response from upstream server: " + line);
            processing_mail = false;
            socket.end();
            return self.bounce("Unrecognised response from upstream server: " + line);
        }
    });
}
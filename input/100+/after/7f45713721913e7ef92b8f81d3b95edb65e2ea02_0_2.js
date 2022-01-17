function (line) {
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
    }
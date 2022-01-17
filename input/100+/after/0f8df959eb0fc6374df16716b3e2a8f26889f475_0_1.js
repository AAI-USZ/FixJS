function (message) { // {{{
        switch ( message.command ) {
            case "001":
                // Set nick to whatever the server decided it really is
                // (normally this is because you chose something too long and
                // the server has shortened it
                self.nick = message.args[0];
                self.emit('registered', message);
                break;
            case "002":
            case "003":
            case "004":
                break;
            case "005":
                message.args.forEach(function(arg) {
                    var match;
                    if ( match = arg.match(/PREFIX=\((.*?)\)(.*)/) ) {
                        match[1] = match[1].split('');
                        match[2] = match[2].split('');
                        while ( match[1].length ) {
                            self.modeForPrefix[match[2][0]] = match[1][0];
                            self.prefixForMode[match[1].shift()] = match[2].shift();
                        }
                    }
                });
                break;
            case "rpl_luserclient":
            case "rpl_luserop":
            case "rpl_luserchannels":
            case "rpl_luserme":
            case "rpl_localusers":
            case "rpl_globalusers":
            case "rpl_statsconn":
                // Random welcome crap, ignoring
                break;
            case "err_nicknameinuse":
                if ( typeof(self.opt.nickMod) == 'undefined' )
                    self.opt.nickMod = 0;
                self.opt.nickMod++;
                self.send("NICK", self.opt.nick + self.opt.nickMod);
                self.nick = self.opt.nick + self.opt.nickMod;
                break;
            case "PING":
                self.send("PONG", message.args[0]);
                break;
            case "NOTICE":
                var from = message.nick;
                var to   = message.args[0];
                if (!to) {
                    to   = null;
                }
                var text = message.args[1];
                if (text[0] === '\1' && text.lastIndexOf('\1') > 0) {
                    self._handleCTCP(from, to, text, 'notice');
                    break;
                }
                self.emit('notice', from, to, text, message);

                if ( self.opt.debug && to == self.nick )
                    util.log('GOT NOTICE from ' + (from?'"'+from+'"':'the server') + ': "' + text + '"');
                break;
            case "MODE":
                if ( self.opt.debug )
                    util.log("MODE:" + message.args[0] + " sets mode: " + message.args[1]);

                var channel = self.chanData(message.args[0]);
                if ( !channel ) break;
                var modeList = message.args[1].split('');
                var adding = true;
                var modeArgs = message.args.splice(2);
                modeList.forEach(function(mode) {
                    if ( mode == '+' ) { adding = true; return; }
                    if ( mode == '-' ) { adding = false; return; }
                    if ( mode in self.prefixForMode ) {
                        // user modes
                        var user = modeArgs.shift();
                        if ( adding ) {
                            if ( channel.users[user].indexOf(self.prefixForMode[mode]) === -1 )
                                channel.users[user] += self.prefixForMode[mode];

                            self.emit('+mode', message.args[0], message.nick, mode, user, message);
                        }
                        else {
                            channel.users[user] = channel.users[user].replace(self.prefixForMode[mode], '');
                            self.emit('-mode', message.args[0], message.nick, mode, user, message);
                        }
                    }
                    else {
                        var modeArg;
                        // channel modes
                        if ( mode.match(/^[bkl]$/) ) {
                            modeArg = modeArgs.shift();
                            if ( modeArg.length === 0 )
                                modeArg = undefined;
                        }
                        // TODO - deal nicely with channel modes that take args
                        if ( adding ) {
                            if ( channel.mode.indexOf(mode) === -1 )
                                channel.mode += mode;

                            self.emit('+mode', message.args[0], message.nick, mode, modeArg, message);
                        }
                        else {
                            channel.mode = channel.mode.replace(mode, '');
                            self.emit('-mode', message.args[0], message.nick, mode, modeArg, message);
                        }
                    }
                });
                break;
            case "NICK":
                if ( message.nick == self.nick )
                  // the user just changed their own nick
                  self.nick = message.args[0];
                
                if ( self.opt.debug )
                    util.log("NICK: " + message.nick + " changes nick to " + message.args[0]);

                var channels = [];

                // TODO better way of finding what channels a user is in?
                for ( var channame in self.chans ) {
                    var channel = self.chans[channame];
                    if ( 'string' == typeof channel.users[message.nick] ) {
                        channel.users[message.args[0]] = channel.users[message.nick];
                        delete channel.users[message.nick];
                        channels.push(channame);
                    }
                }

                // old nick, new nick, channels
                self.emit('nick', message.nick, message.args[0], channels, message);
                break;
            case "rpl_motdstart":
                self.motd = message.args[1] + "\n";
                break;
            case "rpl_motd":
                self.motd += message.args[1] + "\n";
                break;
            case "rpl_endofmotd":
            case "err_nomotd":
                self.motd += message.args[1] + "\n";
                self.emit('motd', self.motd);
                break;
            case "rpl_namreply":
                var channel = self.chanData(message.args[2]);
                var users = message.args[3].trim().split(/ +/);
                if ( channel ) {
                    users.forEach(function (user) {
                        var match = user.match(/^(.)(.*)$/);
                        if ( match ) {
                            if ( match[1] in self.modeForPrefix ) {
                                channel.users[match[2]] = match[1];
                            }
                            else {
                                channel.users[match[1] + match[2]] = '';
                            }
                        }
                    });
                }
                break;
            case "rpl_endofnames":
                var channel = self.chanData(message.args[1]);
                if ( channel ) {
                    self.emit('names', message.args[1], channel.users);
                    self.send('MODE', message.args[1]);
                }
                break;
            case "rpl_topic":
                var channel = self.chanData(message.args[1]);
                if ( channel ) {
                    channel.topic = message.args[2];
                }
                break;
            case "rpl_away":
                self._addWhoisData(message.args[1], 'away', message.args[2], true);
                break;
            case "rpl_whoisuser":
                self._addWhoisData(message.args[1], 'user', message.args[2]);
                self._addWhoisData(message.args[1], 'host', message.args[3]);
                self._addWhoisData(message.args[1], 'realname', message.args[5]);
                break;
            case "rpl_whoisidle":
                self._addWhoisData(message.args[1], 'idle', message.args[2]);
                break;
            case "rpl_whoischannels":
                self._addWhoisData(message.args[1], 'channels', message.args[2].trim().split(/\s+/)); // TODO - clean this up?
                break;
            case "rpl_whoisserver":
                self._addWhoisData(message.args[1], 'server', message.args[2]);
                self._addWhoisData(message.args[1], 'serverinfo', message.args[3]);
                break;
            case "rpl_whoisoperator":
                self._addWhoisData(message.args[1], 'operator', message.args[2]);
                break;
            case "330": // rpl_whoisaccount?
                self._addWhoisData(message.args[1], 'account', message.args[2]);
                self._addWhoisData(message.args[1], 'accountinfo', message.args[3]);
                break;
            case "rpl_endofwhois":
                self.emit('whois', self._clearWhoisData(message.args[1]));
                break;
            case "rpl_liststart":
                self.channellist = [];
                self.emit('channellist_start');
                break;
            case "rpl_list":
                var channel = {
                    name: message.args[1],
                    users: message.args[2],
                    topic: message.args[3],
                };
                self.emit('channellist_item', channel);
                self.channellist.push(channel);
                break;
            case "rpl_listend":
                self.emit('channellist', self.channellist);
                break;
            case "333":
                // TODO emit?
                var channel = self.chanData(message.args[1]);
                if ( channel ) {
                    channel.topicBy = message.args[2];
                    // channel, topic, nick
                    self.emit('topic', message.args[1], channel.topic, channel.topicBy, message);
                }
                break;
            case "TOPIC":
                // channel, topic, nick
                self.emit('topic', message.args[0], message.args[1], message.nick, message);

                var channel = self.chanData(message.args[0]);
                if ( channel ) {
                    channel.topic = message.args[1];
                    channel.topicBy = message.nick;
                }
                break;
            case "rpl_channelmodeis":
                var channel = self.chanData(message.args[1]);
                if ( channel ) {
                    channel.mode = message.args[2];
                }
                break;
            case "329":
                var channel = self.chanData(message.args[1]);
                if ( channel ) {
                    channel.created = message.args[2];
                }
                break;
            case "JOIN":
                // channel, who
                if ( self.nick == message.nick ) {
                    self.chanData(message.args[0], true);
                }
                else {
                    var channel = self.chanData(message.args[0]);
                    channel.users[message.nick] = '';
                }
                self.emit('join', message.args[0], message.nick, message);
                self.emit('join' + message.args[0], message.nick, message);
                if ( message.args[0] != message.args[0].toLowerCase() ) {
                    self.emit('join' + message.args[0].toLowerCase(), message.nick, message);
                }
                break;
            case "PART":
                // channel, who, reason
                self.emit('part', message.args[0], message.nick, message.args[1], message);
                self.emit('part' + message.args[0], message.nick, message.args[1], message);
                if ( message.args[0] != message.args[0].toLowerCase() ) {
                    self.emit('part' + message.args[0].toLowerCase(), message.nick, message.args[1], message);
                }
                if ( self.nick == message.nick ) {
                    var channel = self.chanData(message.args[0]);
                    delete self.chans[channel.key];
                }
                else {
                    var channel = self.chanData(message.args[0]);
                    delete channel.users[message.nick];
                }
                break;
            case "KICK":
                // channel, who, by, reason
                self.emit('kick', message.args[0], message.args[1], message.nick, message.args[2], message);
                self.emit('kick' + message.args[0], message.args[1], message.nick, message.args[2], message);
                if ( message.args[0] != message.args[0].toLowerCase() ) {
                    self.emit('kick' + message.args[0].toLowerCase(), message.args[1], message.nick, message.args[2], message);
                }

                if ( self.nick == message.args[1] ) {
                    var channel = self.chanData(message.args[0]);
                    delete self.chans[channel.key];
                }
                else {
                    var channel = self.chanData(message.args[0]);
                    delete channel.users[message.args[1]];
                }
                break;
            case "KILL":
                var nick = message.args[0];
                var channels = [];
                for ( var channel in self.chans ) {
                    if ( self.chans[channel].users[nick])
                        channels.push(channel);

                    delete self.chans[channel].users[nick];
                }
                self.emit('kill', nick, message.args[1], channels, message);
                break;
            case "PRIVMSG":
                var from = message.nick;
                var to   = message.args[0];
                var text = message.args[1];
                if (text[0] === '\1' && text.lastIndexOf('\1') > 0) {
                    self._handleCTCP(from, to, text, 'privmsg');
                    break;
                }
                self.emit('message', from, to, text, message);
                if ( to.match(/^[&#]/) ) {
                    self.emit('message#', from, to, text, message);
                    self.emit('message' + to, from, text, message);
                    if ( to != to.toLowerCase() ) {
                        self.emit('message' + to.toLowerCase(), from, text, message);
                    }
                }
                if ( to == self.nick ) self.emit('pm', from, text, message);

                if ( self.opt.debug && to == self.nick )
                    util.log('GOT MESSAGE from ' + from + ': ' + text);
                break;
            case "INVITE":
                var from = message.nick;
                var to   = message.args[0];
                var channel = message.args[1];
                self.emit('invite', channel, from, message);
                break;
            case "QUIT":
                if ( self.opt.debug )
                    util.log("QUIT: " + message.prefix + " " + message.args.join(" "));
                if ( self.nick == message.nick ) {
                    // TODO handle?
                    break;
                }
                // handle other people quitting

                var channels = [];

                // TODO better way of finding what channels a user is in?
                for ( var channame in self.chans ) {
                    var channel = self.chans[channame];
                    if ( 'string' == typeof channel.users[message.nick] ) {
                        delete channel.users[message.nick];
                        channels.push(channame);
                    }
                }

                // who, reason, channels
                self.emit('quit', message.nick, message.args[0], channels, message);
                break;
            case "err_umodeunknownflag":
                if ( self.opt.showErrors )
                    util.log("\033[01;31mERROR: " + util.inspect(message) + "\033[0m");
                break;
            default:
                if ( message.commandType == 'error' ) {
                    self.emit('error', message);
                    if ( self.opt.showErrors )
                        util.log("\033[01;31mERROR: " + util.inspect(message) + "\033[0m");
                }
                else {
                    if ( self.opt.debug )
                        util.log("\033[01;31mUnhandled message: " + util.inspect(message) + "\033[0m");
                }
                break;
        }
    }); // }}}
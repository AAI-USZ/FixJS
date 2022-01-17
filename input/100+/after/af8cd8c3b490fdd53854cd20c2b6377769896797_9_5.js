function wsc_protocol( client ) {
    
    var protocol = {
        
        client: null,
        evt_chains: [["recv", "admin"]],
        tablumps: null,
        
        // Mappings for every packet.
        maps: {
            'chatserver': ['version'],
            'dAmnServer': ['version'],
            'login': ['username', ['e'], 'data'],
            'join': ['ns', ['e'] ],
            'part': ['ns', ['e', '*r'] ],
            'property': ['ns', ['p', 'by', 'ts'], '*value' ],
            'recv_msg': [null, [['from', 'user']], '*message'],
            'recv_npmsg': [null, [['from', 'user']], 'message'],
            'recv_action': [null, ['s', ['from', 'user']], '*message'],
            'recv_join': ['user', ['s'], '*info'],
            'recv_part': ['user', ['s', 'r']],
            'recv_privchg': ['user', ['s', 'by', 'pc']],
            'recv_kicked': ['user', ['s', 'by'], '*r'],
            'recv_admin_create': [null, ['p', ['by', 'user'], ['name', 'pc'], 'privs']],
            'recv_admin_update': [null, ['p', ['by', 'user'], ['name', 'pc'], 'privs']],
            'recv_admin_rename': [null, ['p', ['by', 'user'], 'prev', ['name', 'pc']]],
            'recv_admin_move': [null, ['p', ['by', 'user'], 'prev', ['name', 'pc'], ['n', 'affected']]],
            'recv_admin_remove': [null, ['p', ['by', 'user'], ['name', 'pc'], ['n', 'affected']]],
            'recv_admin_show': [null, ['p'], 'info'],
            'recv_admin_showverbose': [null, ['p'], 'info'],
            'recv_admin_privclass': [null, ['p', 'e'], 'command'],
            'kicked': ['ns', [['by', 'user']], '*r'],
            'ping': [],
            'disconnect': [null, ['e']],
            'send': ['ns', ['e']],
            'kick': ['ns', [['u', 'user'], 'e']],
            'get': ['ns', ['p', 'e']],
            'set': ['ns', ['p', 'e']],
            'kill': ['ns', ['e']],
            'unknown': [null, null, null, null, 'packet'],
        },
        
        // Mapping callbacks!
        mapper: {
            "recv": function( args, packet, mapping ) {
                args.ns = packet.param;
                sub = new WscPacket( packet.body );
                
                if( sub.cmd == 'admin' ) {
                    ssub = new WscPacket( sub.body );
                    return protocol.mapPacket(args, ssub, mapping);
                }
                
                return protocol.mapPacket(args, sub, mapping);
            }
            
        },
        
        // Messages for every packet.
        //      pkt_name: [ msg[, monitor[, global]] ]
        // If provided, `monitor` should be true or false. By default the
        // protocol assumes false. When true, the message will be displayed in
        // the monitor channel ONLY. When false, the message will be displayed
        // in the channel the packet came from.
        // If `global` is true, the message is displayed in all open channels.
        messages: {
            'chatserver': ['<span class="servermsg">** Connected to llama {version} *</span>', false, true ],
            'dAmnServer': ['<span class="servermsg">** Connected to dAmnServer {version} *</span>', false, true ],
            'login': ['<span class="servermsg">** Login as {username}: "{e}" *</span>', false, true],
            'join': ['<span class="servermsg">** Join {ns}: "{e}" *</span>', true],
            'part': ['<span class="servermsg">** Part {ns}: "{e}" * <em>{*r}</em></span>', true],
            'property': ['<span class="servermsg">** Got {p} for {ns} *</span>', true],
            'recv_msg': ['<span><strong class="user">&lt;{user}&gt;</strong></span><span class="cmsg">{message}</span>'],
            'recv_action': ['<span class="caction user"><em>* {user}</em></span><span class="caction">{message}</span>'],
            'recv_join': ['<span class="cevent bg">** {user} has joined *</span>'],
            'recv_part': ['<span class="cevent bg">** {user} has left * <em>{r}</em></span>'],
            'recv_privchg': ['<span class="cevent">** {user} has been made a member of {pc} by {by} *</span>'],
            'recv_kicked': ['<span class="cevent">** {user} has been kicked by {by} * <em>{*r}</em></span>'],
            'recv_admin_create': ['<span class="cevent admin">** Privilege class {pc} has been created by {user} with: {privs} *</span>'],
            'recv_admin_update': ['<span class="cevent admin">** Privilege class {pc} has been updated by {user} with: {privs} *</span>'],
            'recv_admin_rename': ['<span class="cevent admin">** Privilege class {prev} has been renamed to {name} by {user} *</span>'],
            'recv_admin_move': ['<span class="cevent admin">** All members of {prev} have been moved to {pc} by {user} -- {affected} affected user(s) *</span>'],
            'recv_admin_remove': ['<span class="cevent admin">** Privilege class {pc} has been removed by {user} -- {affected} affected user(s) *</span>'],
            'recv_admin_show': null,
            'recv_admin_showverbose': null,
            'recv_admin_privclass': ['<span class="cevent admin">** Admin command "{command}" failed: {e} *</span>'],
            'kicked': ['<span class="servermsg">** You have been kicked by {user} * <em>{r}</em></span>'],
            'ping': ['<span class="servermsg">** Ping...</span>', true],
            'disconnect': ['<span class="servermsg">** You have been disconnected * <em>{e}</em></span>', false, true],
            // Stuff here is errors, yes?
            'send': ['<span class="servermsg">** Send error: <em>{e}</em></span>'],
            'kick': ['<span class="servermsg">** Could not kick {user}: <em>{e}</em></span>'],
            'get': ['<span class="servermsg">** Could not get {p} info for {ns}: <em>{e}</em></span>'],
            'set': ['<span class="servermsg">** Could not set {p}: <em>{e}</em></span>'],
            'kill': ['<span class="servermsg">** Kill error: <em>{e}</em></span>'],
            'unknown': ['<span class="servermsg">** Received unknown packet in {ns}: <em>{packet}</em></span>', true],
        },
        
        // Initialise!
        init: function( client ) {
            this.client = client;
            this.mapper['recv'] = this.map_recv;
            this.tablumps = new WscTablumps();
            
            if ( this.client.settings['tablumps'] !== null ) {
                lumpmap = this.client.settings['tablumps']();
                this.client.view.extend(lumpmap, this.tablumps.lumps);
                this.tablumps.registerMap( lumpmap );
            }
            
            //client.bind("data.wsc", this.debug_pkt);
            client.bind('chatserver.wsc', this.chatserver);
            client.bind('dAmnServer.wsc', this.chatserver);
            client.bind('login.wsc', this.login);
            client.bind('join.wsc', this.join);
            client.bind('part.wsc', this.part);
            //client.bind('kicked.wsc', this.kicked);
            client.bind('ping.wsc', this.ping);
            client.bind('property.wsc', this.property);
            client.bind('recv_join.wsc', this.recv_joinpart);
            client.bind('recv_part.wsc', this.recv_joinpart);
            client.bind('recv_msg.wsc', this.recv_msg);
            client.bind('recv_action.wsc', this.recv_msg);
            client.bind('recv_privchg.wsc', this.recv_privchg);
            client.bind('recv_kicked.wsc', this.recv_kicked);
        },
        
        // What to do with every packet.
        debug_pkt: function ( e ) {
            console.log(e.pkt.serialize());
            console.log(e);
        },
    
        // Established a WebSocket connection.
        connected: function( evt ) {
            this.client.trigger('connected.wsc', {name: 'connected', pkt: new WscPacket('connected\n\n')});
            //console.log("Connection opened");
            this.client.connected = true;
            this.client.handshake();
            this.client.attempts = 0;
        },
    
        // WebSocket connection closed!
        closed: function( evt ) {
            console.log(evt);
            this.client.trigger('closed.wsc', {name: 'closed', pkt: new WscPacket('connection closed\n\n')});
            
            if(this.client.connected) {
                this.client.monitorAll("Connection closed");
                this.client.connected = false;
            } else {
                this.client.monitorAll("Connection failed");
            }
            
            // For now we want to automatically reconnect.
            // Should probably be more intelligent about this though.
            if( this.client.attempts > 2 ) {
                this.client.monitorAll("Can't connect. Try again later.");
                this.client.attempts = 0;
                return;
            }
            
            this.client.monitorAll("Connecting in 5 seconds...");
            setTimeout(this.client.connect.bind(this.client), 5000);
        
        }, 
    
        // Received data from WebSocket connection.
        process_data: function( evt ) {
            var pack = new WscPacket(evt.data);
            
            if(pack == null)
                return;
            
            var event = this.client.event_name(pack);
            // Uncomment if you want everything ever in the console.
            //console.log(event + '.wsc');
            //console.log(JSON.stringify(pack));
            pevt = this.packetEvent(event, pack);
            this.log(pevt);
            this.client.trigger('data.wsc', pevt);
            this.client.trigger(event + '.wsc', pevt);
            //this.monitor(data);
        },
        
        // Create a wsc event based on a packet.
        packetEvent: function( name, packet ) {
            var args = { 'name': name, 'pkt': packet, 'ns': this.client.mns };
        
            if( !this.maps[name] )
                return args;
            
            mapping = this.maps[name];
            cmd = packet.cmd;
            
            if( this.mapper[cmd] )
                this.mapper[cmd](args, packet, mapping);
            else
                this.mapPacket(args, packet, mapping);
            
            return args;
            
        },
        
        // Map packet data.
        mapPacket: function( arguments, pkt, mapping ) {
            for(i in mapping) {
                if( mapping[i] == null)
                    continue;
                
                key = mapping[i];
                skey = key;
                switch(i) {
                    // e.<map[event][0]> = pkt.param
                    case "0":
                        arguments[key] = pkt['param'];
                        break;
                    // for n in map[event][1]: e.<map[event][1][n]> = pkt.arg.<map[event][1][n]>
                    case "1":
                        for( n in mapping[1] ) {
                            key = mapping[1][n];
                            if( key instanceof Array ) {
                                arguments[key[1]] = pkt['arg'][key[0]];
                                skey = key[1];
                            } else {
                                k = key[0] == '*' ? key.slice(1) : key;
                                arguments[key] = pkt['arg'][k] || '';
                                skey = key;
                            }
                        }
                        break;
                    // e.<map[event][2]> = pkt.body
                    case "2":
                        if( key instanceof Array )
                            this.mapPacket(arguments, new WscPacket(pkt['body']), key);
                        else
                            arguments[key] = pkt['body'];
                        break;
                }
                
                if( skey[0] != '*' )
                    continue;
                
                k = skey.slice(1);
                arguments[k] = this.tablumps.parse( arguments[skey] );
            }
        },
        
        // Map all recv_* packets.
        map_recv: function( arguments, pkt, mapping ) {
            protocol.mapPacket(arguments, pkt, ['ns', null, mapping]);
        },
        
        // Log a protocol message somewhere.
        log: function( event ) {
            msgm = protocol.messages[event.name];
            
            if( !msgm )
                return;
            msg = msgm[0];
            
            if( event.s == '0' )
                return;
            
            for( key in event ) {
                d = key == 'ns' ? protocol.client.deform_ns(event[key]) : event[key];
                msg = msg.replacePArg( '{'+key+'}', d);
            }
            
            if( !msgm[2] ) {
                if( !msgm[1] )
                    protocol.client.channel(event.ns).logItem(msg);
                else
                    protocol.client.channel(protocol.client.mns).logItem(msg);
            } else
                protocol.client.logItemAll(msg);
        },
        
        /* DANGER!
         * THAR BE PROTOCOL LOGIC BEYOND THIS POINT!
         * Srsly just a load of event handler thingies.
         * lolol.
         */ 
        
        // Respond to pings from the server.
        ping: function( event ) {
            //protocol.client.monitor("Ping...");
            protocol.client.pong();
        },
        
        // Respond to a llama-style handshake.
        chatserver: function ( e ) {
            //protocol.client.monitor(
            //    "Connected to " + e.pkt["cmd"] + " " + e.pkt["arg"]["server"] + " version " +e.pkt["arg"]["version"]+".");
            protocol.client.login();
        },
        
        // Process a login packet
        login: function( e ) {
            
            if(e.pkt["arg"]["e"] == "ok") {
                //protocol.client.monitor("Logged in as " + e.pkt["param"] + '.');
                // Use the username returned by the server!
                info = new WscPacket('info\n' + e.data);
                protocol.client.settings["username"] = e.pkt["param"];
                protocol.client.settings['symbol'] = info.arg.symbol;
                protocol.client.settings['userinfo'] = info.arg;
                // Autojoin!
                // TODO: multi-channel?
                if ( protocol.client.fresh )
                    protocol.client.join(client.settings["autojoin"]);
                else {
                    for( key in protocol.client.channelo ) {
                        if( protocol.client.channelo[key].info['namespace'][0] != '~' )
                            protocol.client.join(key);
                    }
                }
            } else {
                //protocol.client.monitor("Failed to log in: \"" + e.pkt["arg"]["e"] + '"');
            }
            
            if( protocol.client.fresh )
                protocol.client.fresh = false;
            
            
        },
        
        // Received a join packet.
        join: function( e ) {
            if(e.pkt["arg"]["e"] == "ok") {
                ns = protocol.client.deform_ns(e.pkt["param"]);
                //protocol.client.monitor("You have joined " + ns + '.');
                protocol.client.createChannel(ns);
                protocol.client.channel(ns).serverMessage("You have joined " + ns);
            } else {
                protocol.client.cchannel.serverMessage("Failed to join " + protocol.client.deform_ns(e.pkt["param"]), e.pkt["arg"]["e"]);
            }
        },
        
        // Received a part packet.
        part: function( e ) {
            ns = protocol.client.deform_ns(e.ns);
            if(e.e == "ok") {
                console.log(e);
                info = '';
                if( e.pkt["arg"]["r"] )
                    info = '[' + e.pkt["arg"]["r"] + ']';
                
                msg = 'You have left ' + ns;
                c = protocol.client.channel(ns);
                c.serverMessage(msg, info);
                protocol.client.removeChannel(ns);
                if( protocol.client.channels() == 0 ) {
                    switch( e.r ) {
                        case 'bad data':
                        case 'bad msg':
                        case 'msg too big':
                            break;
                        default:
                            if( e.r.indexOf('killed:') < 0 )
                                return;
                            break;
                    }
                    protocol.process_data( { data: 'disconnect\ne='+e.r+'\n' } );
                }
            } else {
                protocol.client.monitor('Couldn\'t leave ' + protocol.client.deform_ns(e.pkt['param']), e.pkt['arg']['e']);
            }
        },
        
        // Process a property packet.
        property: function( e ) {
            //console.log(e.pkt["arg"]["p"]);
            chan = protocol.client.channel(e.pkt["param"]);
            
            if( !chan )
                return;
            
            chan.property(e);
        },
        
        // User join or part.
        recv_joinpart: function( e ) {
            c = protocol.client.channel(e.ns);
            if( e.name == 'recv_join')
                c.recv_join(e);
            else
                c.recv_part(e);
        },
        
        // Display a message received from a channel.
        recv_msg: function( e ) {
            protocol.client.channel(e.ns).recv_msg(e);
        },
        
        // Someone was promoted or demoted.
        recv_privchg: function( e ) {
            protocol.client.channel(e.ns).recv_privchg(e);
        },
        
        // Some sucka got kicked foo.
        recv_kicked: function( e ) {
            protocol.client.channel(e.ns).recv_kicked(e);
        }
        
    };
    
    protocol.init(client);
    return protocol;

}
function wsc_client( view, options, mozilla ) {
    
    /**
     * @object client
     * @author photofroggy
     * 
     * @note To create a client, use the {wsc wsc jQuery method}.
     * 
     * This object acts as a client for dAmn-like chat servers.
     * When initialising the object, you can provide different configuration
     * options using the ``options`` parameter.
     */
    var client = {
    
        view: null,
        mozilla: false,
        control: null,
        tabul: null,
        chatbook: null,
        connected: false,
        conn: null,
        fresh: true,
        evt_chains: [["recv", "admin"]],
        events: null,
        attempts: 0,
        settings: {
            "domain": "website.com",
            "server": "ws://website.com/wsendpoint",
            "agent": "wsc 0.1a",
            "symbol": "",
            "username": "",
            "userinfo": {},
            "pk": "",
            // Monitor: `ns`
            "monitor": ['~Monitor', true],
            "welcome": "Welcome to the wsc web client!",
            "autojoin": "chat:channel",
            "protocol": wsc_protocol,
            "extend": [wsc_extdefault],
            "control": wsc_control,
            "stype": 'llama',
            "client": 'chatclient',
            "tablumps": null,
            "avatarfile": '$un[0]/$un[1]/{un}',
            "defaultavatar": 'default.gif',
            "avatarfolder": '/avatars/',
            "emotefolder": '/emoticons/',
            "thumbfolder": '/thumbs/',
            "theme": 'wsct_default',
        },
        // Protocol object.
        protocol: null,
        // Object containing all channel objects.
        channelo: {},
        // Current channel object.
        cchannel: null,
        // Known command names.
        cmds: [],
        
        /**
         * @constructor init
         * @author photofroggy
         * 
         * I guess this is what I would consider the "actual" constructor.
         * 
         * @param [jQuery] element The client's main view.
         * @param [Boolean] mozilla Are we running firefox?
         */
        init: function( view, options, mozilla ) {
            
            view.extend( this.settings, options );
            view.append('<div class="wsc '+this.settings['theme']+'"></div>');
            // Set up variables.
            this.attempts = 0;
            this.view = view.find('.wsc');
            this.mozilla = mozilla;
            this.connected = false;
            this.conn = null;
            this.events = new EventEmitter();
            this.mns = this.format_ns(this.settings['monitor'][0]);
            this.lun = this.settings["username"].toLowerCase();
            this.channelo = {};
            this.protocol = this.settings["protocol"]( this );
            //this.addListener('closed'
            
            // Debug!
            //console.log(this);
            
            // Load in extensions
            this.cmds = [];
            for(var index in this.settings["extend"]) {
                this.settings["extend"][index](this);
            }
            
            // Prepare the UI.
            this.buildUI();
            
            // Welcome!
            this.monitor(this.settings["welcome"]);
            
        },
        
        /**
         * @function registerExtension
         * Use this function to register an extension with the client after
         * creating the client. This method should be called through jQuery
         * as follows:
         * 
         * @example registering an extension
         *  $('.container').wsc( 'registerExtension', my_constructor );
         *  
         *  // The above uses an example 'my_constructor', which can be as simple
         *  // as the following.
         *  function my_constructor( client ) {
         *      client.addListener( 'cmd.slap.wsc',
         *          function( e ) {
         *              // Slap your victim or something.
         *              client.action( e.target, 'slaps ' + ( e.args || e.user ) );
         *          }
         *      );
         *  }
         * 
         * @param [Function] constructor Extension constructor.
         */
        registerExtension: function( constructor ) {
            if( container === undefined )
                return;
            client.settings['extend'].push( constructor );
            constructor( client );
        },
        
        /**
         * @function jq_registerExtension
         * jQuery interface for registerExtension.
         * 
         * @param [jQuery] view jQuery view the method was called through.
         * @param [Function] constructor Extension constructor.
         */
        jq_registerExtension: function( view, constructor ) {
            client.registerExtension(constructor);
        },
        
        /**
         * @function bind
         * Bind an event handler to a specific wsc event. Doing this will make
         * the client call the handler every time the given event is triggered.
         * @param [String] event Name of the event to bind the handler to.
         * @param [Function] handler Event handling function.
         */
        bind: function( event, handler ) {
            this.events.addListener(event, function( e ) { handler( e ); });
            jqi = event.indexOf('.wsc');
            
            if( event.indexOf('cmd.') != 0 || jqi == -1 || jqi == 4 )
                return;
            
            cmd = event.slice(4, jqi).toLowerCase();
            this.cmds.push(cmd);
        },
        
        /**
         * @function jq_bind
         * jQuery interface for the bind method.
         * @param [jQuery] view Element the method was called on.
         * @param [Object] opt Method arguments.
         */
        jq_bind: function( view, opt ) {
            client.bind( opt['event'], opt['handler'] );
        },
        
        /**
         * @function removeListeners
         * Removes all event listeners from the client.
         */
        removeListeners: function( ) {
            this.events.removeListeners();
        },
        
        /**
         * @function trigger
         * Trigger an event in the client.
         * @param [String] event Name of the event to trigger.
         * @param [Object] data Event data.
         */
        trigger: function( event, data ) {
            //console.log("emitting "+ event);
            this.events.emit(event, data);
        },
        
        /**
         * @function jq_trigger
         * jQuery interface for the trigger method.
         */
        jq_trigger: function( view, opts ) {
            client.trigger( opts['event'], opts['data'] );
        },
        
        /**
         * @function channel
         * 
         * @overload
         *  Get the channel object associated with the given namespace.
         *  @param [String] namespace
         *  
         * @overload
         *  Set the channel object associated with the given namespace.
         *  @param [String] namespace
         *  @param [Object] chan A {wsc_channel.channel wsc channel object} representing the channel specified.
         */
        channel: function( namespace, chan ) {
            namespace = this.deform_ns(namespace).slice(1).toLowerCase();
            /* 
            console.log(namespace);
            console.log(this.channelo);
            /* */
            if( !this.channelo[namespace] && chan )
                this.channelo[namespace] = chan;
            
            return this.channelo[namespace];
        },
        
        /**
         * @function channels
         * 
         * Determine how many channels the client has open. Hidden channels are
         * not included in this, and we don't include the first channel because
         * there should always be at least one non-hidden channel present in the
         * client.
         * 
         * @return [Integer] Number of channels open in the client.
         */
        channels: function( ) {
            chans = -1;
            for(ns in client.channelo) {
                if( client.channelo[ns].hidden )
                    continue;
                chans++;
            }
            return chans;
        },
        
        /**
         * @function connect
         * 
         * This function can be used to open a connection to the chat server. If
         * we are already connected, this function does nothing.
         * 
         * @todo Create a fallback to use if WebSockets are not available. Like,
         *  really now.
         */
        connect: function( ) {
            if( client.connected )
                return;
            
            this.attempts++;
            
            // Start connecting!
            if(CanCreateWebsocket()) {
                client.conn = client.createChatSocket();
                //console.log("connecting");
                client.trigger('start.wsc', new WscPacket('client connecting\ne=ok\n\n'));
            } else {
                client.monitor("Your browser does not support WebSockets. Sorry.");
                client.trigger('start.wsc', new WscPacket('client connecting\ne=no websockets available\n\n'));
            }
        },
        
        // We need this, dawg.
        jq_connect: function( ) {
            client.connect();
        },
        
        /**
         * @function createChatSocket
         * Does what it says on the tin.
         * @return [Object] WebSocket connection.
         */
        createChatSocket: function( ) {
            
            var client = this;
            return CreateWebSocket(
                this.settings["server"],
                // WebSocket connection closed!
                function( evt ) { client.protocol.closed( evt ); },
                // Received a message from the server! Process!
                function( evt ) { client.protocol.process_data( evt ); },
                // Connection opened.
                function( evt ) { client.protocol.connected( evt ); }
            );
            
        },
        
        // Build the initial UI.
        buildUI: function( ) {
            this.view.append( wsc_html_ui );
            this.control = this.settings['control']( this );
            this.tabul = this.view.find('#chattabs');
            this.chatbook = this.view.find('div.chatbook');
            // The monitor channel is essentially our console for the chat.
            hide = this.settings.monitor[1];
            this.createChannel(this.mns, hide);
            this.control.setInput();
            this.control.focus();
            /*
            this.cchannel.setHeader('title', { pkt: {
                        "arg": { "by": "", "ts": "" },
                        "body": '<p>sample title</p>'
                    }
                }
            );
            /**/
            /*
            this.cchannel.setHeader('topic', { pkt: {
                        'arg': { 'by': '', 'ts': '' },
                        'body': '<p>sample topic</p>'
                    }
                }
            );
            /**/
            // For testing purposes only.
            // this.createChannel("llama2", "~Llama2", "server:llama2");
            this.resizeUI();
        },
        
        resizeUI: function( ) {
            // Resize control panel.
            client.control.resize();
            
            
            // Main view dimensions.
            //console.log('>> pH:',client.view.parent().height());
            client.view.height( client.view.parent().height() );
            client.view.width( '100%' );
            
            h = (client.view.parent().height() - client.tabul.outerHeight(true) - client.control.height());
            //console.log('>> rUI h parts:',client.view.parent().height(),client.tabul.outerHeight(true),client.control.height());
            //console.log('>> rUI h:', h);
            // Chatbook dimensions.
            client.chatbook.height(h);
            
            // Channel dimensions.
            for(select in client.channelo) {
                chan = client.channel(select);
                chan.resize();
            }
            //client.control.resize();
        },
        
        // Called by setInterval every two minutes. Approximately. Maybe. Who cares?
        // It is up to whatever implements the client to set up the loop by
        // calling setInterval(client.loop, 120000); or whatever variations.
        // Wsc's jQuery plugin does this automagically.
        loop: function( ) {
            client.doLoop();
        },
        
        // Ok so I lied, this is the stuff that actually runs on the loop thingy.
        // This is to avoid thingies like scope fucking up. Seriously. Wtf js?
        doLoop: function( ) {
            for( key in this.channelo ) {
                c = this.channelo[key];
                msgs = c.logpanel.find( '.logmsg' );
                
                if( msgs.length < 100 )
                    continue;
                
                while( msgs.length > 100 ) {
                    msgs.slice(0, 10).remove();
                    msgs = c.logpanel.find( '.logmsg' );
                }
                
                c.resize();
            }
        },
        
        // Create a screen for channel `ns` in the UI, and initialise data
        // structures or some shit idk. The `selector` parameter defines the
        // channel without the `chat:` or `#` style prefixes. The `ns`
        // parameter is the string to use for the tab.
        createChannel: function( ns, toggle ) {
            chan = this.channel(ns, wsc_channel(this, ns));
            chan.build();
            this.toggleChannel(ns);
            if( toggle )
                chan.invisible();
        },
        
        // Remove a channel from the client and the GUI.
        // We do this when we leave a channel for any reason.
        // Note: last channel is never removed and when removing a channel
        // we switch to the last channel in the list before doing so.
        removeChannel: function( ns ) {
            if( this.channels() == 0 ) 
                return;
            
            chan = this.channel(ns);
            chan.remove();
            delete this.channelo[chan.info["selector"]];
            
            var select = '';
            for (tmp in this.channelo) {
                if (this.channelo.hasOwnProperty(tmp) && tmp != chan.info['selector'])
                    select = tmp;
            }
            
            this.toggleChannel(select);
            this.channel(select).resize();
        },
        
        // Select which channel is currently being viewed.
        toggleChannel: function( ns ) {
            //console.log("out: "+previous+"; in: "+ns);
            chan = this.channel(ns);
            
            if( !chan )
                return;
            
            if(this.cchannel) {
                if(this.cchannel == chan)
                    return;
                // Hide previous channel, if any.
                //console.log("prevshift ", previous);
                this.cchannel.hideChannel();
                this.control.cacheInput();
            }
            
            // Show clicked channel.
            chan.showChannel();
            this.control.focus();
            this.cchannel = chan;
            this.control.setLabel();
            if( this.settings['monitor'][1] ) {
                mt = this.tabul.find('#' + this.channel(this.mns).info['selector'] + '-tab')
                mt.addClass(this.settings['monitor'][1]);
            }
            this.resizeUI();
        },
    
        // Write a message to the UI.
        // `ns` is the name of the channel. No `chat:` or `#` style prefix.
        // `msg` is the raw string to be desplayed. Provide messages fully
        // formatted in HTML kthxbai.
        log: function( ns, msg ) {
            var chan = this.channel(ns);
            if( !chan )
                return;
            chan.log(msg);
        },
        
        // Send a log message to all channels.
        logAll: function( msg ) {
            for( ns in this.channelo )
                this.channlo[ns].log(msg);
        },
        
        // Send a log item to all channels.
        logItemAll: function( msg ) {
            for( ns in this.channelo )
                this.channelo[ns].logItem(msg);
        },
        
        monitorAll: function( msg, info ) {
            for( ns in this.channelo )
                this.channelo[ns].serverMessage(msg, info);
        },
        
        // Write a server message to the UI.
        serverMessage: function( ns, msg, info ) {
            var chan = this.channel(ns);
            if( !chan )
                return;
            chan.serverMessage(msg, info);
        },
        
        // System message displayed in the monitor window.
        monitor: function( msg, info ) {
            this.serverMessage(this.mns, msg, info);
        },
        
        // Deform a channel namespace.
        deform_ns: function( ns ) {
            if(ns.indexOf("chat:") == 0)
                return '#' + ns.slice(5);
            
            if(ns.indexOf("server:") == 0)
                return '~' + ns.slice(7);
            
            if(ns.indexOf("pchat:") == 0) {
                var names = ns.split(":");
                names.shift();
                for(i in names) {
                    name = names[i];
                    if(name.toLowerCase() != this.lun) {
                        return '@' + name;
                    }
                }
            }
            
            if(ns[0] != '#' && ns[0] != '@' && ns[0] != '~')
                return '#' + ns;
            
            return ns;
        },
        
        // Format a channel namespace.
        format_ns: function( ns ) {
            if(ns.indexOf('#') == 0) {
                return 'chat:' + ns.slice(1);
            }
            if(ns.indexOf('@') == 0) {
                var names = [ns.slice(1), this.lun];
                names.sort(caseInsensitiveSort)
                names.unshift("pchat");
                return names.join(':');
            }
            if(ns.indexOf('~') == 0) {
                return "server:" + ns.slice(1);
            }
            if(ns.indexOf('chat:') != 0 && ns.indexOf('server:') != 0 && ns.indexOf('pchat:') != 0)
                return 'chat:' + ns;
            
            return ns;
        },
        
        // Get the event name of a given packet.
        event_name: function( pkt ) {
            
            var name = pkt["cmd"];
            var cmds = null;
            for(var index in this.evt_chains) {
                
                cmds = this.evt_chains[index];
                
                if(cmds[0] != name)
                    continue;
                
                var sub = new WscPacket(pkt["body"]);
                name = name + '_' + sub["cmd"];
                
                if(cmds.length > 1 && sub["param"] != undefined) {
                    if(cmds[1] == sub["cmd"])
                        return name + '_' + sub["param"];
                }
            
            }
            
            return name;
        },
        
        // Send a message to the server.
        // Uses a raw packet string.
        send: function( msg ) {
            if(this.connected) {
                return this.conn.send(msg);
            }
            return -1;
        },
        
        // Protocol methods. Woop!
        
        // Send the chat user agent.
        handshake: function( ) {
            this.send(wsc_packetstr(this.settings['client'], "0.3", {
                "agent": this.settings["agent"]
            }));
        },
        
        // Send a pong!
        pong: function( ) {
            this.send(wsc_packetstr("pong"));
        },
        
        // Send login details.
        login: function( ) {
            pkt = 'login ' + this.settings["username"] + '\npk=' + this.settings["pk"] + '\n';
            this.send( pkt );
        },
        
        // Join a channel.
        join: function( ns ) {
            this.send(wsc_packetstr("join", this.format_ns(ns)));
        },
        
        // Part a channel.
        part: function( ns ) {
            this.send(wsc_packetstr('part', this.format_ns(ns)));
        },
        
        // Promote a user.
        promote: function( ns, user, pc ) {
            this.send(wsc_packetstr('send', this.format_ns(ns), {},
                wsc_packetstr('promote', user, {}, ( !pc ? '' : pc ))));
        },
        
        // Send a message to a channel.
        say: function( ns, msg ) {
            this.send(wsc_packetstr('send', this.format_ns(ns), {},
                wsc_packetstr('msg', 'main', {}, msg)
            ));
        },
        
        // Send a non-parsed message to a channel.
        npmsg: function( ns, msg ) {
            this.send(wsc_packetstr('send', this.format_ns(ns), {},
                wsc_packetstr('npmsg', 'main', {}, msg)
            ));
        },
        
        // Send an action message to a channel.
        action: function( ns, action ) {
            this.send(wsc_packetstr('send', this.format_ns(ns), {},
                wsc_packetstr('action', 'main', {}, action)
            ));
        },
        
        // Set the title.
        title: function( ns, title ) {
            this.send(wsc_packetstr('set', this.format_ns(ns), {
                'p': 'title'}, title));
        },
        
        // Kick some mofo
        kick: function( ns, user, r ) {
            this.send(wsc_packetstr('kick', this.format_ns(ns), {
                'u': user }, r ? r : null));
        },
    
    };
    
    client.init(view, options, mozilla);
    return client;

}
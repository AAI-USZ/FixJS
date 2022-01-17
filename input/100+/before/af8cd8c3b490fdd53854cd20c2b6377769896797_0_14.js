function( view, options, mozilla ) {
            
            view.append('<div class="wsc"></div>');
            // Set up variables.
            this.view = view.find('.wsc');
            this.mozilla = mozilla;
            this.connected = false;
            this.conn = null;
            this.events = new EventEmitter();
            this.view.extend( this.settings, options );
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
            
        }
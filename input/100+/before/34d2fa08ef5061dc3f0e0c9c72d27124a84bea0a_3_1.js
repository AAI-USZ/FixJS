function APS( server, events, options ){
	this.option = {
		'poll': 25000,
		debug: true,
		session: true,
		connectionArgs: {},
		server: server
	}
	this.identifier = "APS";
	this.version = 'draft-v2';
	this.state = 0;
	this.events = {};
	this.chl = 0;
	this.user = {};
	this.pipes = {};
	this.channels = {};
	this.eQueue = {};
	
	//Add Events
	this.on(events);

	var cb = {
		'onmessage': this.onMessage.bind(this),
		'onerror': function(err){
			console.log("ERROR >> ",err);
		}
	}

	this.connect = function(args){
		var client = this;
		this.option.connectionArgs = args || this.option.connectionArgs;
		
		server = server || APS.server;
		if(this.state == 0)
			this.transport = new APS.transport(server, cb, options);
		
		//alert("connnecting...")
		
		//Handle sessions
		if(this.option.session == true){
			if(this.session.restore() == true) return this;
		}
		
		this.sendCmd('CONNECT', args);
		
		return this;
	}
	
	this.session.client = this;
	return this;
}
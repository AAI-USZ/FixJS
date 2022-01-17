function() {
		var self = {	
			send: function(bus, amount) {
				bus.connectUgen(this, amount);
			},
			connect : function(bus) {
				this.destinations.push(bus);
				if(bus === Gibberish.MASTER) {
					Gibberish.connect(this);
				}else{
					console.log("CONNECTING", this.ugenVariable);
					bus.connectUgen(this, 1);
				}
				Gibberish.dirty(true);
				return this;
			},
			disconnect : function(bus) {
				console.log("DISCONNECT 1");
				if(bus === Gibberish.MASTER) {
					Gibberish.disconnect(this);
				}else if(bus){
					//console.log("CONNECTING", this.ugenVariable);
					bus.disconnectUgen(this);
					this.destinations.remove(bus);
				}else{
								console.log("DISCONNECT 2 Length ", this.destinations.length);
					for(var i = 0; i < this.destinations.length; i++) {
						this.destinations[i].disconnectUgen(this);
					}
					this.destinations.remove();
				
				}
				Gibberish.dirty(true);
				return this;
			},
		
			out : function() {
				this.connect(Gibberish.MASTER);
				return this;
			},
		
			addFX : function() {
				for(var i = 0; i < arguments.length; i++) {
					this.fx.push(arguments[i]);
				}
				Gibberish.dirty(this);
			},
		
			fx:			null,
			mods:		[],
			modding:	[],
			mod:		that.mod,
			removeMod:	that.removeMod,
			dirty:		true,
			destinations : [],
		};
		Gibberish.extend(this, self);
		
		this.fx = [];
		
		var parent = this;
		this.fx.prototype.parent = this;
		this.fx.add = function() {
			console.log("FX ADDED CALLED");
			for(var i = 0; i < arguments.length; i++) {
				this.push(arguments[i]);
			}
			Gibberish.dirty(parent);
		};
		console.log(this.fx.add);
		return this;
	}
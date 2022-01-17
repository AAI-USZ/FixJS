function(effects) {
			var that = {
				senders : [],
				length	: 0,
				type	: "Bus",
				category: "Bus",
				amount	: 1,

				connect : function(bus) {
					this.destinations.push(bus);
					if(bus === Gibberish.MASTER) {
						Gibberish.connect(this);
					}else{
						bus.connectUgen(this, 1);
					}
					this.dirty = true;
					Gibberish.dirty = true;
				},

				connectUgen : function(variable, amount) { // man, this is hacky... but it should be called rarely
					//this["senders" + this.length++] = { type:"*", operands:[variable, amount]};
					console.log("CONNECTING");
					
					amount = isNaN(amount) ? 1 : amount;
					
					this.senders.push({ type:"*", operands:[variable, amount]});
					variable.destinations.push(this);
					
					this.dirty = true;
					Gibberish.dirty = true;
				},
				
				disconnectUgen : function(ugen) {
					for(var i = 0; i < this.senders.length; i++) {
						if(this.senders[i].operands[0] === ugen) {
							this.senders.splice(i,1);
							this.senders.dirty = true;
							break;
						}
					}
					this.dirty = true;
					Gibberish.dirty = true;
				},

				send: function(bus, amount) {
					bus.connectUgen(this, amount);
				},
			};

			Gibberish.extend(that, Gibberish.ugen);
			that.fx = effects || [];

			that.name = Gibberish.generateSymbol(that.type);
			that.type = that.name;

			Gibberish.generators[that.type] = Gibberish.createGenerator(["senders"], "{0}( {1} )");

			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Bus\"]();");
			window[that.name] = Gibberish.make["Bus"](that.senders);

			//Gibberish.defineProperties( that, ["senders", "dirty"]);
			return that;
		}
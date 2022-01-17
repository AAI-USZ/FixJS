function(variable, amount) { // man, this is hacky... but it should be called rarely
					//this["senders" + this.length++] = { type:"*", operands:[variable, amount]};
					console.log("CONNECTING");
					
					amount = isNaN(amount) ? 1 : amount;
					
					this.senders.push({ type:"*", operands:[variable, amount]});
					variable.destinations.push(this);
					
					Gibberish.dirty(this);
				}
function(bus) {
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
			}
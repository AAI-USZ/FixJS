function(bus) {
				this.destinations.push(bus);
				if(bus === Gibberish.MASTER) {
					Gibberish.connect(this);
				}else{
					console.log("CONNECTING", this.ugenVariable);
					bus.connectUgen(this, 1);
				}
				Gibberish.dirty(true);
				return this;
			}
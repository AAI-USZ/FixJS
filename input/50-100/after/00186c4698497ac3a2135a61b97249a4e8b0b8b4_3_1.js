function(bus) {
					this.destinations.push(bus);
					if(bus === Gibberish.MASTER) {
						Gibberish.connect(this);
					}else{
						bus.connectUgen(this, 1);
					}
					Gibberish.dirty(this);
				}
function(ugen) {
					for(var i = 0; i < this.senders.length; i++) {
						if(this.senders[i].operands[0] === ugen) {
							this.senders.splice(i,1);
							this.senders.dirty = true;
							break;
						}
					}
					Gibberish.dirty(this);
				}
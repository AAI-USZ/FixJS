function(_frequency) {
					if(typeof this.frequency === "object") {
						prevFreq = this.frequency.operands[0];
					}else{
						prevFreq = this.frequency;
					}
					
					this.frequency = _frequency;
					this._function.setFrequency(_frequency);
					if(this.env.getState() > 1) this.env.setState(0);
					
					if(this.glide > 0) {
						this.mod("frequency", Line(_frequency - prevFreq, 0, this.glide), "-");
					
						var oldMod = this.mods[this.mods.length - 1];
						
						var me = this;
						future( function() { me.removeMod(oldMod) }, this.glide );
					}	
				}
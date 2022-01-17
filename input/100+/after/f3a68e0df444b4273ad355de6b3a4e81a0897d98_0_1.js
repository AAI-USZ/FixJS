function(frequency) {
					if(typeof this.frequency === "object") {
						prevFreq = this.frequency.operands[0];
					}else{
						prevFreq = this.frequency;
					}
					
					this.frequency = frequency;
					this._function.setFrequency(frequency);
					this.env.start();
					
					if(this.glide > 0) {
						this.mod("frequency", Line(frequency - prevFreq, 0, this.glide), "-");
					
						var oldMod = this.mods[this.mods.length - 1];
						
						var me = this;
						future( function() { me.removeMod(oldMod) }, this.glide );
					}
				}
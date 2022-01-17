function(frequency) {
					this.frequency = frequency;
					this._function.setFrequency(frequency);
					this.env.start();
				}
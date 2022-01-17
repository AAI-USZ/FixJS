function(_frequency) {
					this.frequency = _frequency;
					this._function.setFrequency(_frequency);
					if(this.env.getState() > 1) this.env.setState(0);
				}
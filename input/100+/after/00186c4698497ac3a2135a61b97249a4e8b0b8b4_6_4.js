function(properties) {
			var that = { 
				type:		"KarplusStrong",
				category:	"Gen",
				amp:		.5,
				damping:	.0,
				dampingValue: 0,
				blend:		 1,
				buffer: 	[],
				
				note : function(frequency) {
					var _size = Math.floor(44100 / frequency);
					this.buffer = []; //new Float32Array(_size); // needs push and shift methods
					
					for(var i = 0; i < _size ; i++) {
						this.buffer[i] = Math.random() * 2 - 1; // white noise
					}
					
					this._function.setBuffer(this.buffer);
				},
			};
			
			Gibberish.extend(that, new Gibberish.ugen());
			//that.fx.parent = new FXArray(this);
			
			var damping = that.damping;
			
		    Object.defineProperty(that, "damping", {
				get: function() {
					return damping * 100;
				},
				set: function(value) {
					damping = value / 100;
					that.dampingValue = .5 - damping;
					Gibberish.dirty(this);
				}
			});

			
			if(typeof properties !== "undefined") {
				Gibberish.extend(that, properties);
			}
			
			that.dampingValue = .5 - that.damping;
			
			that.buffer.push(0);
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"KarplusStrong\"]();");	
			that._function = Gibberish.make["KarplusStrong"](that.buffer);
			window[that.name] = that._function;
			
			Gibberish.defineProperties( that, ["blend", "amp"] );
			
			return that;
		}
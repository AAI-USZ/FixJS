function(decoded) { 
					that.buffer = decoded.channels[0]; 
					that.bufferLength = decoded.length;
					
					that._function = Gibberish.make["Sampler"](that.buffer); // only passs ugen functions to make
					window[that.name] = that._function;
					
					Gibberish.dirty(that);
				}
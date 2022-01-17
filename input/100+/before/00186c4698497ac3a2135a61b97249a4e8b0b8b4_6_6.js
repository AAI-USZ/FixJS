function(pathToAudioFile) {
			var that = {
				type: 			"Sampler",
				category:		"Gen",
				audioFilePath: 	pathToAudioFile,
				buffer : 		null,
				bufferLength:   null,
				speed:			1,
				_function:		null,
				onload : 		function(decoded) { 
					that.buffer = decoded.channels[0]; 
					that.bufferLength = decoded.length;
					
					that._function = Gibberish.make["Sampler"](that.buffer); // only passs ugen functions to make
					window[that.name] = that._function;
					
					Gibberish.dirty = true;
					that.dirty = true;	
				},
				note: function(speed) {
					this.speed = speed;
					if(this._function !== null) {
						this._function.setPhase(0);
						Gibberish.dirty = true;
						this.dirty = true;
					}
				},
			};
			
			// if(typeof properties !== "undefined") {
			// 	Gibberish.extend(that, properties);
			// }
			Gibberish.extend(that, Gibberish.ugen);
			
		    var request = new AudioFileRequest(that.audioFilePath);
		    request.onSuccess = that.onload;
		    request.send();
			
			that.name = Gibberish.generateSymbol(that.type);
			Gibberish.masterInit.push(that.name + " = Gibberish.make[\"Sampler\"]();");	
			
			return that;
		}
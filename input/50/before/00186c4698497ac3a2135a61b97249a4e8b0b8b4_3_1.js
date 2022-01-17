function(value) {
						if(_time !== value) {
							_time = value;
							obj.buffer = new Float32Array(value);
							that.dirty = true;
							Gibberish.dirty = true;
						}
					}
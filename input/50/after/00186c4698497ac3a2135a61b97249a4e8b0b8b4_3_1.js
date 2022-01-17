function(value) {
						if(_time !== value) {
							_time = value;
							obj.buffer = new Float32Array(value);
							Gibberish.dirty(that);
						}
					}
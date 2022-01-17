function(_value) {
							//console.log("SETITING", propName, _value);
							if(typeof value === "number" || typeof value === "boolean"){
								value = _value;
							}else{
								value["operands"][0] = _value;
							}
							
							if(propName !== "dirty") {
								that.dirty = true;
							}
							//console.log(that);
							if(typeof that.destinations !== "undefined") {
								if(that.destinations.length > 0) {
									for(var i = 0; i < that.destinations.length; i++) {
										that.destinations[i].dirty = true;
									}
								}
							}
							Gibberish.dirty = true;
						}
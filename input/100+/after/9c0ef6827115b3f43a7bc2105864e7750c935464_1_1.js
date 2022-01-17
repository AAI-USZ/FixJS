function(_value) {
							if(typeof value === "number" || typeof value === "boolean"){
								value = _value;
							}else{
								value["operands"][0] = _value;
							}
							
							for(var j = 0; j < obj.children.length; j++) {
								obj.children[j][propName] = value;
							}

							if(that.category === "FX") {
								that.dirty = true;
								Gibberish.dirty(that.parent.parent); // that.parent is fx array, parent of fx array is ugen
							}else{
								Gibberish.dirty(that);
							}
						}
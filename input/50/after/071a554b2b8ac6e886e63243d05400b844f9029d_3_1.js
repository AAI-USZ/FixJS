function(name, old, current){
						if(!isNaN(name)){
							var w = _self.getChildren()[name - 0];
							w && w.set(w._relTargetProp || "target", current);
						}
					}
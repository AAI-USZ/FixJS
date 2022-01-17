function(ev, attr, how, newVal, oldVal){
			// detects an add, sorts it, re-adds?			
			
			// if we are sorting, and an attribute inside us changed
			/*if(this.comparator && /^\d+./.test(attr) ) {
				
				// get the index
				var index = +/^\d+/.exec(attr)[0],
					// and item
					item = this[index],
					// and the new item
					newIndex = this.sortedIndex(item);
				
				if(newIndex !== index){
					// move ...
					splice.call(this, index, 1);
					splice.call(this, newIndex, 0, item);
					
					trigger(this, "move", [item, newIndex, index]);
					ev.stopImmediatePropagation();
					trigger(this,"change", [
						attr.replace(/^\d+/,newIndex),
						how,
						newVal,
						oldVal
					]);
					return;
				}
			}*/
			
			// if we add items, we need to handle 
			// sorting and such
			
			// trigger direct add and remove events ...
			if(attr.indexOf('.') === -1){
				
				if( how === 'add' ) {
					trigger(this, how, [newVal,+attr]);
					trigger(this,'length',[this.length]);
				} else if( how === 'remove' ) {
					trigger(this, how, [oldVal, +attr]);
					trigger(this,'length',[this.length]);
				}
				
			}
			// issue add, remove, and move events ...
		}
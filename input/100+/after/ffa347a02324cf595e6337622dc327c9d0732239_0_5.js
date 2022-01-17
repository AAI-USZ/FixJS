function(e){
			// Get selected item and name from dialog prompt
			var selectedItem = this.tree.selectedItem;
			var data = dijit.byId('addDialog').get('value');
			var name = data.name;
			// Check that a name was actually entered
			if(name.length<1){
				alert('Node label cannot be left blank');
				return false;
			}
			// Create new item.
            // We don't actually have a true way to generate unique IDs (unique across all clients).
			var date = new Date();
			var newId = String(Math.random()).substr(2) + String(date.getTime());
			var newItem = this.store.newItem({ id: newId, name:name});
			var parentId = selectedItem.id[0];
			// Update parent item's children in store & save
			var children = selectedItem.children;
			if(children == undefined)
				children = [];
			children = [newItem].concat(children);
			this.store.setValue(selectedItem,'children',children);
			this.store.save();
			// Trigger local callback
			this.onLocalAddNode({
				id: newId.toString(),
				parentId: parentId,
				value: name,
				pos: 0
			});
			// Housekeeping
			dijit.byId('addName').set('value','');
		}
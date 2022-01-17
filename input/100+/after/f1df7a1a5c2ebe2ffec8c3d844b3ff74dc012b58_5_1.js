function(Y) {
	var YArray = Y.Array;
	
	Y.TreeModelList = Y.Base.create('treeModelList', Y.ModelList, [], {
		
		initializer: function(){
			this.model =  Y.TreeModel;
			this.on('add', this._addInterceptor);
			this.on('remove', this._removeInterceptor);
			this.on('*:depthLevelChange', this._childDepthChanging);
			this.after('*:collapsedChange', this._childCollapsedChanged);
		},
		
		indent: function(item){
			var list = this,
				itemIndex = list.indexOf(item),
				itemParentId = item.get('parent'),
				itemDepthLevel = item.get('depthLevel'),
				newParent,
				i;
				
			//Indent means become child of you sibling.				
			for(i=itemIndex-1; i>=0; i--){
				newParent = list.item(i);
				//So climb up in the list to find an item whose parent is same as your parent (means find previous sibling) 
				if (itemParentId == newParent.get('parent')) {
					this._changeParent(item, newParent);
					break;	
				} else {
				    //if no proper parent is found then newParent is undefined
				    newParent = undefined;
				}
			}
			
			return newParent;
		},
		
		outdent: function(item){
			var list = this,
				itemIndex = list.indexOf(item),
				itemParentId = item.get('parent'),
				newParentId,
				newParent,
				currentParent,
				i;
				
			//Outdent means become sibling of your parent, if you don't have parent then outdent is not possible
			if (itemParentId){
				currentParent = list.getByClientId(itemParentId);
				newParentId = currentParent.get('parent');
				
				if (newParentId) {
					newParent = list.getByClientId(newParentId);
					var descendants = this._changeParent(item, newParent);
					
					//Move the outdented item (as will it's descendants) next to it's old parent
					list.remove(descendants, {silent: true});
					var currentParentIndex = list.indexOf(currentParent),
						currentParentDescendants = [],
						newLocation;
					
					//Moving next to it's old parent means, moving after oldparent and oldparent's descendants
					this._findDescendants(currentParent, currentParentDescendants);	
					newLocation = currentParentIndex + currentParentDescendants.length + 1;
					
					YArray.each(descendants, function(model, index){
						list.add(model, {index: (newLocation+index), silent: true});	
					});
				}
			}
		},
		
		_changeParent: function(child, newParent){
			var currentParentId = child.get('parent'),
				childClientId = child.get('clientId'),
				oldParent,
				list = this,
				childVisibility,
				depthAdjustment;
				
				//If current parent is there, then remove the item from being a child of current parent
				if (currentParentId){
					oldParent = list.getByClientId(currentParentId);
					oldParent.get('children').remove(childClientId);
				}
				
				newParent.get('children').add(childClientId); //Add the item as child of new parent				
				child.set('parent', newParent.get('clientId')); //Associate new parent with item
				
				//Adjustment for the depth of descendants = child's new depth - child's current depth
				//child's new depth = newParent's depth + 1
				depthAdjustment = (newParent.get('depthLevel') + 1) - child.get('depthLevel');
				//If new parent is collapsed then the child and all it's descendants should be invisible
				childVisibility = !newParent.get('collapsed');
				
				//now change the depth of all the descendants of item
				var descendants = [];
				descendants.push(child);				
				this._findDescendants(child, descendants);
				Y.Array.each(descendants, function(descendant){
					var depthLevel = descendant.get('depthLevel');
					depthLevel = parseInt(depthLevel, 10) + depthAdjustment;
					descendant.set('depthLevel', depthLevel, {silent: true});
					//if child is not visible all it's descendants should also not be visible
					if (!childVisibility){
						descendant.set('visible', childVisibility);
					}
				});
				
				return descendants;
		},
		
		_childCollapsedChanged: function(e){
			var collapsedChild = e.target;
			if (e.newVal) {
				this._collapseNode(this, collapsedChild);
			} else {
				this._expandNode(this, collapsedChild);
			}
		},
		
		_collapseNode: function(list, model){
			model.get('children').each(function(item){
				var child = list.getByClientId(item);
				child.set('visible', false, {silent: true});
				this._collapseNode(list, child);
			}, this);
		},
		
		_expandNode: function(list, model){
			model.get('children').each(function(item){
				var child = list.getByClientId(item);
				child.set('visible', true, {silent: true});
				if (child.get('collapsed')){
					// Do nothing since child is collapsed, it's children will already be hidden. 
					// No need to open them as we would like to keep the child state untouched
				} else {
					this._expandNode(list, child);
				}
			}, this);
		},
		
		_addInterceptor: function(e){
			var newClientId = e.model.get('clientId'),
				above = this.item(e.index-1),
				defaultParentClientId = above ? above.get('parent') : undefined;
			
			if (defaultParentClientId){
				e.model._set('parent', defaultParentClientId);
				this.getByClientId(defaultParentClientId).get('children').add(newClientId);
				e.model.set('depthLevel', above.get('depthLevel'), {silent: true});
			}
		},
		
		_removeInterceptor: function(e){
			var descendants = [],
				clientId = e.model.get('clientId'),
				parentClientId = e.model.get('parent'),
				parent = this.getByClientId(parentClientId);
				
			if (parent){
				parent.get('children').remove(clientId);
			}		
			
			this._findDescendants(e.model, descendants);
			this.remove(descendants, {silent: true});
		},
		
		_findDescendants: function(model, arr){
			model.get('children').each(function(item) {
				var modelItem = this.getByClientId(item);
				
				arr.push(modelItem);
				this._findDescendants(modelItem, arr);
			},this);
		}

	});
}
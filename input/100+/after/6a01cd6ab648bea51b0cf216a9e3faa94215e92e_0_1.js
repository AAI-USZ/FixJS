function(/*item*/ item, /* dijit._Contained */ parentPane){
		// summary:
		//		returns a widget for the given store item.  The returned
		//		item will be added to this widget's container widget.  null will
		//		be passed in for an "empty" item.
		var store = this.store;
		if(!item || !store || !store.isItem(item)){
			var i = new dijit.MenuItem({
				label: "---",
				disabled: true,
				iconClass: "dojoxEmpty",
				focus: function(){
					// Do nothing on focus of this guy...
				}
			});
			this._updateClass(i.domNode, "Item");
			return i;
		}else{
			var itemLoaded = store.isItemLoaded(item);
			var childItems = itemLoaded ? this.getChildItems(item) : undefined;
			var widgetItem;
			if(childItems){
				widgetItem = this.getMenuItemForItem(item, parentPane, childItems);
				widgetItem.children = childItems;
				this._updateClass(widgetItem.domNode, "Item", {"Expanding": true});
				if(!widgetItem._started){
					var c = widgetItem.connect(widgetItem, "startup", function(){
						this.disconnect(c);
						dojo.style(this.arrowWrapper, "visibility", "");
					});
				}else{
					dojo.style(widgetItem.arrowWrapper, "visibility", "");
				}
			}else{
				widgetItem = this.getMenuItemForItem(item, parentPane, null);
				if(itemLoaded){
					this._updateClass(widgetItem.domNode, "Item", {"Single": true});
				}else{
					this._updateClass(widgetItem.domNode, "Item", {"Unloaded": true});
					widgetItem.attr("disabled", true);
				}
			}
			widgetItem.store = this.store;
			widgetItem.item = item;
			if(!widgetItem.label){
				widgetItem.attr("label", this.store.getLabel(item).replace(/</,"&lt;"));
			}
			if(widgetItem.focusNode){
				var self = this;
				widgetItem.focus = function(){
					// Don't set our class
					if(!this.disabled){try{this.focusNode.focus();}catch(e){}}
				};
				widgetItem.connect(widgetItem.focusNode, "onmouseenter", function(){
					if(!this.disabled){
						self._updateClass(this.domNode, "Item", {"Hover": true});
					}
				});
				widgetItem.connect(widgetItem.focusNode, "onmouseleave", function(){
					if(!this.disabled){
						self._updateClass(this.domNode, "Item", {"Hover": false});
					}
				});
				widgetItem.connect(widgetItem.focusNode, "blur", function(){
					self._updateClass(this.domNode, "Item", {"Focus": false, "Hover": false});
				});
				widgetItem.connect(widgetItem.focusNode, "focus", function(){
					self._updateClass(this.domNode, "Item", {"Focus": true});
					self._focusedPane = parentPane;
				});
				if(this.executeOnDblClick){
					widgetItem.connect(widgetItem.focusNode, "ondblclick", function(){
						self._onExecute();
					});
				}
			}
			return widgetItem;
		}
	}
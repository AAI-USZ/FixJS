function(array, lang, event, connect, mouse, cookie, _dndSelector) {

	// set references to be able to call overriden methods
	var ref = _dndSelector.prototype;
	var oldMouseUp = ref.onMouseUp;
	var oldMouseMove = ref.onMouseMove;

	// TODO: make right click (context menu) select the tree node (also see dnd/GridSelector.js)
	return _dndSelector.extend({
		_oldSelection: [],
		_selectByMouse: false,
		_dragged: false,
		getSelectedNodes: ref.getSelectedTreeNodes, // map two dnd method



		/*** add state for selection to tree until patch http://bugs.dojotoolkit.org/ticket/14058 is checked in 1.8? ***/
/*
		_updateSelectionProperties: function(){
			var selected = this.getSelectedTreeNodes();
			var paths = [], nodes = [], selects = [];
			array.forEach(selected, function(node){
				var ary = node.getTreePath(), model = this.tree.model;
				nodes.push(node);
				paths.push(ary);
				ary = array.map(ary, function(item){
					return model.getIdentity(item);
				}, this);
				selects.push(ary.join("/"))
			}, this);
			var items = array.map(nodes,function(node){ return node.item; });
			this.tree._set("paths", paths);
			this.tree._set("path", paths[0] || []);
			this.tree._set("selectedNodes", nodes);
			this.tree._set("selectedNode", nodes[0] || null);
			this.tree._set("selectedItems", items);
			this.tree._set("selectedItem", items[0] || null);
         if (this.tree.persist && selects.length > 0) {
	         cookie(this.cookieName, selects.join(","), {expires:365});
         }
		},
		*/
		/*** end patch ***/

		onMouseDown: function(evt) {
			// Note: Overriding to remove doing nothing on right click and also to remove stopping event (we need to bubble up
			// to know where user clicked at in FileExplorer.getWidget
			this._selectByMouse = true;
			this._dragged = false;

			// ignore click on expando node
			if(!this.current || this.tree.isExpandoNode(evt.target, this.current)){ return; }

			evt.preventDefault(); // prevent browser from selecting text in tree, but still allows to bubble

			var treeNode = this.current,
			  copy = connect.isCopyKey(evt), id = treeNode.id;

			// _doDeselect is the flag to indicate that the user wants to either ctrl+click on
			// a already selected item (to deselect the item), or click on a not-yet selected item
			// (which should remove all current selection, and add the clicked item). This can not
			// be done in onMouseDown, because the user may start a drag after mousedown. By moving
			// the deselection logic here, the user can drag an already selected item.
			if (!this.singular && !evt.shiftKey && this.selection[id]) {
				this._doDeselect = true;
				return;
			} else {
				this._doDeselect = false;
			}
			this.userSelect(treeNode, copy, evt.shiftKey);	// add node to selection and calls setSelection()
		},

		onMouseMove: function() {
			oldMouseMove.apply(this, arguments);
			this._dragged = true;
		},

		onMouseUp: function(evt) {
			var i, len, selection;

			// selecting/deselecting does not work correctly when in multiselect mode after dragging unselected node
			oldMouseUp.apply(this, arguments);
			// Prevent selecting onMouseDown -> move to onMouseUp, but not when dragging (-> set to false onMouseMove())
			if (!this._dragged) {	// set to false on mousemove
				selection = this._oldSelection;
				i = 0;
				len = selection.length;
				for (; i < len; i++) {
					selection[i].setSelected(false);
				}
				selection = this.getSelectedTreeNodes();
				i = 0;
				len = selection.length;
				for (; i < len; i++) {
					selection[i].setSelected(true);
				}
				this._oldSelection = selection;
			}
			this._selectByMouse = false;
			this._dragged = false;
		},

		setSelection: function(newSelection) {
			// Note: Overriden (parent) method would do two things: Add/remove nodes from/to selection and set them selected.
			// To make 1. and 2. (see class comment) work, this should be rewritten and split into two separated methods.
			// Unfortunately that's not possible since this method is also used by other methods, such as tree.set('path').
			// Therefore we use a flag when using it with the mouse, which will skip selecting/deselecting a node here, so we
			// can do it in mouseUp if there was no drag in between
			var oldSelection = this.getSelectedTreeNodes();
			array.forEach(this._setDifference(oldSelection, newSelection), lang.hitch(this, function(node){
				if (!this._selectByMouse) {
					node.setSelected(false);
				}
				if(this.anchor == node){
					delete this.anchor;
				}
				delete this.selection[node.id];
			}));
			array.forEach(this._setDifference(newSelection, oldSelection), lang.hitch(this, function(node){
				if (!this._selectByMouse) {
					node.setSelected(true);
					this._oldSelection.push(node);
				}
				this.selection[node.id] = node;
			}));
			this._updateSelectionProperties();
		}
	});
}
function(evt) {
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
		}
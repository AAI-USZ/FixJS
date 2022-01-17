function(view) {
			view._setParent(this);
			this.children.push(view);
			this.containerNode.appendChild(view.domNode);
			view._hasBeenLaidOut = false;
			this._triggerLayout(this._isAttachedToActiveWin());
		}
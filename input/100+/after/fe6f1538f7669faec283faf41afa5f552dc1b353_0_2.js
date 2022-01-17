function(view) {
			// TODO: add and respect this.persist
			if (this.treePaneVisible) {
				this.contentPaneBc.removeChild(this.treePane);
				if (view == 'vertical') {
					this.treePane.set({
						region: 'top',
						style: 'width: 100%; height: 25%;'
					});
				}
				else if (view === 'horizontal') {
					this.treePane.set({
						region: 'left',
						style: 'width: 25%; height: 100%'
					});
				}
				// hiding treePane messes up layout, fix that
				if (this.contentPane._started && cpPosition) {
					style.set(this.contentPane.domNode, {
						left: cpPosition.x + 'px',
						top: cpPosition.y + 'px',
						width: cpPosition.w + 'px',
						height: cpPosition.h + 'px'
					});
					this.contentPaneBc.resize({w: cpPosition.w, h: cpPosition.h});	// propagates style to all children
				}
				this.contentPaneBc.addChild(this.treePane);
			}
			this._set('view', view);
		}
function() {
			// TODO: should tree connect also on right click as grid? If so, attache event to set currentTreeItem
			this.currentTreeObject = new Stateful();	// allows Toolbar and Menubar to keep track of selected item in tree
			this.history = {
				steps: [],
				curIdx: null,
				numSteps: 5
			};
			this.store = new FileStore();
			this.context = new Stateful({
				isOnGrid: false,
				isOnTree: false,
				isOnTreePane: false,
				isOnGridPane: false
			})
		}
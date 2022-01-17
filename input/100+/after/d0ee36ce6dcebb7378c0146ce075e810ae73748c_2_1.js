function() {
				this.panes = new Panes({
					view: 'horizontal'
				}, this.id);

				this.toolbar = new Toolbar({
					rfe: this
				}, domConstruct.create('div'));
				this.menubar = new Menubar({
					rfe: this
				}, domConstruct.create('div'));
				this.editContextMenu = new EditContextMenu({
					rfe: this
				});

				this.menubar.placeAt(this.panes.menuPane.domNode);
				this.toolbar.placeAt(this.panes.menuPane.domNode);

				this.panes.startup();
				this.console = new Console();
				this.console.placeAt(this.panes.logPane.domNode)
				this.initGrid();
				this.initTree();
				this.initDialogs();

			}
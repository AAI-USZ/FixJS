function(array, lang, declare, event, aspect, on, cookie, domConstruct, query, Tree, TreeSource,
				Grid, registry, CheckBox, Dialog, Toolbar, Menubar, Panes, EditContextMenu) {

		return declare(null, {

			_cnDialogSettingsFolderState: 'DialogSettingsFolderState',	// name of cookie

			panes: null,
			toolbar: null,
			menubar: null,

			tree: null,
			grid: null,

			constructor: function(props) {
				lang.mixin(this, props || {});
			},

			init: function() {
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
				this.initGrid();
				this.initTree();
				this.initDialogs();
			},

			/**
			 * Initializes the tree and tree dnd.
			 */
			initTree: function() {
				var self = this;
				this.tree = new Tree({
					model: this.store,
					childrenAttrs: [this.store.childrenAttr],
					openOnClick: false,		//	If true, clicking a folder node's label will open it, rather than calling onClick()
					openOnDblClick: false,	// If true, double-clicking a folder node's label will open it, rather than calling onDblClick()
					showRoot: true,
					persist: cookie(this._cnDialogSettingsFolderState) || true,
					dndController: function(arg, params) {
						return new TreeSource(arg, lang.mixin(params || {}, {
							accept: ['treeNode', 'gridNode'],
							store: self.store,
							singular: true
						}))
					}
				});
				this.tree.placeAt(this.panes.treePane)
			},

			initGrid: function() {
				var div = domConstruct.create('div', {}, this.panes.gridPane.domNode);
				this.grid = new Grid({
					store: null	// store is set in FileExplorer.initState()
				}, div);
			},

			initDialogs: function() {
				// TODO: use dijit template for all dialogs
				new Dialog({
					id: 'rfeDialogAbout',
					title: "About Remote File Explorer (rfe)",
					content: '<div id="rfeDialogAboutLogo"><img src="library/rfe/resources/images/logo-speich.net.png" alt="speich.net logo" title="Created by Simon Speich, www.speich.net"/></div>' +
					'<div id="rfeDialogAboutText">' +
					'<h2>Remote File Explorer (rfe)</h2>' +
					'<p>version ' + this.version + ' - ' + this.versionDate + '</p>' +
					'<p>Created by <a href="http://www.speich.net">Simon Speich</a>, www.speich.net using the ' +
					'<a href="http://www.dojotoolkit.org">dojotoolkit</a> and <a href="http://www.php.net">PHP</a>.</p>' +
					'<p>Can be used and altered freely as long as this dialog with logo and link is included.</p>' +
					'</div>'
				});

				var self = this;
				var dialog = new Dialog({
					id: 'rfeDialogSettings',
					title: "Settings",
					content: '<div>' +
					'<fieldset><legend>Navigation Pane (Folders)</legend></fieldset>' +
					'</div>'
				});


				// TODO: move dialog creation to constructor/init so we can use cookie also to set store on first display
				var label = domConstruct.create('label', {
					innerHTML: 'Remember folders state'
				}, query('fieldset', dialog.domNode)[0], 'last');
				domConstruct.create('br', null, label);
				var input = domConstruct.create('input', null, label, 'first');
				new CheckBox({
					checked: cookie(this._cnDialogSettingsFolderState) || true,
					onChange: function() {
						self.tree.set('persist', this.checked);
						cookie(this._cnDialogSettingsFolderState, this.checked);
					}
				}, input);

				label = domConstruct.create('label', {
					innerHTML: 'Show folders only'
				}, query('fieldset', dialog.domNode)[0], 'last');
				input = domConstruct.create('input', null, label, 'first');
				new CheckBox({
					checked: true,
					onClick: function() {
						self.store.skipWithNoChildren = this.checked;
						self.reload();
					}
				}, input);
			},

			showDialogAbout: function() {
				registry.byId('rfeDialogAbout').show();
			},

			showDialogSettings: function() {
				registry.byId('rfeDialogSettings').show();
			}

		});
}
function () {
		this.inherited(arguments);

		this._page = new umc.widgets.Page({
			headerText: "Warteschlangenmusikverwaltungstool",
		});
		this.addChild(this._page);

		var widgets = [{
			type: 'ComboBox',
			name: 'server',
			label: "Server",
			dynamicValues: "asteriskMusic/queryServers",
		}, {
			type: 'ComboBox',
			name: 'moh',
			label: "Musikklasse",
			dynamicValues: "asteriskMusic/queryMohs",
			dynamicOptions: function (values) {
				return { serverdn: values.server };
			},
			depends: [
				"server",
			],
		}, {
			type: 'Button',
			name: 'create',
			label: "Musikklasse anlegen",
			callback: dojo.hitch(this, function () {
				var name = prompt("Bitte geben Sie den Namen für die neue Musikklasse ein:");
				if (!name) {
					alert("Ungültiger Name.");
					return;
				}

				var call = this.umcpCommand("asteriskMusic/create", {
					name: name,
					server: this._serverdn,
				});
				call.then(dojo.hitch(this, function (data) {
					umc.dialog.notify("Musikklasse wurde angelegt.");

					this._mohSelect.setInitialValue(data.result.newDn, false);
					this._setServer(this._serverdn);
				}));
			}),
		}, {
			type: 'Button',
			name: 'delete',
			label: "Musikklasse löschen",
			callback: dojo.hitch(this, function () {
				var call = this.umcpCommand("asteriskMusic/delete", {
					mohdn: this._mohdn,
				});
				call.then(dojo.hitch(this, function (data) {
					umc.dialog.notify("Musikklasse wurde entfernt.");

					this._mohSelect.setInitialValue(null, false);
					this._setServer(this._serverdn);
				}));
			}),
		}, {
			type: 'Uploader',
			name: 'upload',
			maxSize: 8129000,
			showClearButton: false,
			onUploaded: dojo.hitch(this, function () {
				//alert("upload finished");
				window.setTimeout(dojo.hitch(this, function() {
					this._upload._updateLabel();
				}), 0);
				var call = this.umcpCommand("asteriskMusic/upload", {
					moh: this._mohdn,
					data: this._upload.value,
					filename: this._filename,
				});
				call.then(dojo.hitch(this, function (res) {
					this._upload._resetLabel();
					umc.dialog.notify("Musikstück wurde hochgeladen.");
					this._setMoh(this._mohdn);
				}));
			}),
		}];

		var layout = [
			[ "server", "create" ],
			[ "moh", "delete" ],
			[ "upload" ],
		];

		this._form = new umc.widgets.Form({
			widgets: widgets,
			layout: layout,
			region: "top",
		});
		this._page.addChild(this._form);

		this._grid = new umc.widgets.Grid({
			moduleStore: umc.store.getModuleStore("name",
					"asteriskMusic/songs"),
			columns: [{
				name: 'name',
				label: 'Name des Musikstücks',
			}],
			actions: [{
				name: 'delete',
				label: "Löschen",
				callback: dojo.hitch(this, function (id) {
					this._grid.filter({
						mohdn: this._mohdn,
						delete: id,
					});
				}),
			}],
		});
		this._page.addChild(this._grid);

		console.log(this);
		fubar = this;
	}
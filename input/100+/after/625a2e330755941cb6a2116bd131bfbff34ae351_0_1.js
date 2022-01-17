function () {
		this.inherited(arguments);

		this._page = new umc.widgets.Page({
			headerText: "Deployment von Asterisk-Konfigurationen",
		});
		this.addChild(this._page);

		var widgets = [{
			type: 'ComboBox',
			name: 'server',
			label: "Server",
			dynamicValues: "asteriskDeploy/queryServers",
// ssh-copy-id is not supported yet
//		}, {
//			type: 'Button',
//			name: 'copyid',
//			label: "SSH-Schlüssel kopieren",
//			callback: dojo.hitch(this, function () {
//				var rootpw = prompt("Root-Passwort des Asterisk-Servers?");
//				if (!rootpw || !rootpw.length)
//					return;
//
//				this._startAction("asteriskDeploy/copyid", {
//					server: this._serverdn,
//					rootpw: rootpw,
//				});
//			}),
		}, {
			type: 'Button',
			name: 'create',
			label: "Konfiguration testen",
			callback: dojo.hitch(this, function () {
				this._startAction("asteriskDeploy/create", {
					server: this._serverdn,
				});
			}),
		}, {
			type: 'Button',
			name: 'deploy',
			label: "Konfiguration anwenden",
			callback: dojo.hitch(this, function () {
				this._startAction("asteriskDeploy/deploy", {
					server: this._serverdn,
				});
			}),
		}];

		var layout = [
//			[ "server", "copyid" ],
			[ "server" ],
			[ "create", "deploy" ],
		];

		this._form = new umc.widgets.Form({
			widgets: widgets,
			layout: layout,
			region: "top",
		});
		this._page.addChild(this._form);
		
		this._log = new umc.widgets.Text({
			style: "font-family: monospace; overflow: scroll; white-space: pre;",
		});

		var container = new umc.widgets.ExpandingTitlePane({
			title: "Letzte Logdatei",
		});
		this._page.addChild(container);
		container.addChild(this._log);

		asteriskDeploy = this;
	}
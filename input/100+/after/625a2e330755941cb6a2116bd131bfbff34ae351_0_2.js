function (action, args) {
		this._form.getWidget("server")._setDisabledAttr(true);
//		this._form.getWidget("copyid")._setDisabledAttr(true);
		this._form.getWidget("create")._setDisabledAttr(true);
		this._form.getWidget("deploy")._setDisabledAttr(true);
		
		var call = this.umcpCommand(action, args);
		call.then(dojo.hitch(this, function (data) {
			this._stopAction();
			umc.dialog.notify("Befehl ausgeführt; Siehe Logdatei im unteren Teil des Fensters");
		}), dojo.hitch(this, function (data) {
			this._stopAction();
			umc.dialog.notify("Fehler!");
		}));
	}
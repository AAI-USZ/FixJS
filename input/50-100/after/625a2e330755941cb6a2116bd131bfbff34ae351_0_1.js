function () {
		this._form.getWidget("server")._setDisabledAttr(false);
//		this._form.getWidget("copyid")._setDisabledAttr(false);
		this._form.getWidget("create")._setDisabledAttr(false);
		this._form.getWidget("deploy")._setDisabledAttr(false);

		this._refreshLog();
	}
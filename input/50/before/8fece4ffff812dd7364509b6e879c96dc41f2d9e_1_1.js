function(){

		var preferences = {

			//flowLayout: this._flowBox.checked,

			snap: this._snap.checked,

			showPossibleParents: this._showPossibleParents.checked,

			cssOverrideWarn: this._cssOverrideWarn.checked,

			absoluteWidgetsZindex: this._absoluteWidgetsZindex.value

		};

		return preferences;

	}
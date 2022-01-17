function (newMode) {

		this._latestSourceMode = newMode;

		this.switchDisplayMode(newMode);

		var sourceComboButtonNode = dojo.query('.maqSourceComboButton');

		if(sourceComboButtonNode){

			var sourceComboButton = dijit.byNode(sourceComboButtonNode[0]);

			if(sourceComboButton){

				sourceComboButton.set('label', veNls[newMode]);

			}

		}

	}
function(args) {
			var f = this._field = dom.create("input", {
				autocomplete: "off",
				style: {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			}, this._fieldWrapper = dom.create("span", {
				style: {
					position: "absolute",
					left: 0,
					right: 0,
					top: 0,
					bottom: 0
				}
			}, this.domNode));

			this._initTextBox();
			this._keyboardType();
			this.borderStyle = UI.INPUT_BORDERSTYLE_BEZEL;

			require.on(f, "focus", this, function() {
				this.clearOnEdit && (f.value = "");
			});
		}
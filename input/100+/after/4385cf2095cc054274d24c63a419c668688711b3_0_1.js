function (hostEditor) {
		var self = this;
		this.editor = hostEditor;
		console.log(this.editor);
		this.parentClass.load.call(this, hostEditor);

		this.$wrapperDiv = $("<div>");
		this.$wrapperDiv.ColorPicker({
			flat: true,
			color: this.color,
			onChange: function (hsb, hex, rgb) {
				self.setColor(hex);
			}
		});

		this.$htmlContent.append(this.$wrapperDiv);
		$(document).on('mousedown.InlineColorPicker', this.onDocumentClick.bind(this));
	}
function (event, ui) {
				if (ui.panel.id === "styleNameInput") {
					$("#styleNameResult").show();
					$("#styleFormatResult").hide();
				} else {
					$("#styleNameResult").hide();
					$("#styleFormatResult").show();
				}
			}
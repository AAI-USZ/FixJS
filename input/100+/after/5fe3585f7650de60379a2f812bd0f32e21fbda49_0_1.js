function (buttonEvent) {
			var index = $(buttonEvent.target).attr("attrIndex");

			if (nodeData.attributes[index].enabled) {
				nodeData.attributes[index].enabled = false;
				$("#nodeAttribute" + index).attr("disabled", "disabled");
			} else {
				nodeData.attributes[index].enabled = true;
				$("#nodeAttribute" + index).removeAttr("disabled");
			}

			setupPanel(panel, nodeData, dataType, schemaAttributes, schemaChoices,
				executeCommand);
			clearTimeout(onChangeTimeout);
			onChangeTimeout = setTimeout(function () { nodeChanged(); }, 10);
		}
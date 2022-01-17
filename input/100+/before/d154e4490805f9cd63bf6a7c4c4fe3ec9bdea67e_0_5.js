function (attribute, ui) {
			if (that.currentAttribute === null && ui.mainOption === that.mainOptionSelect.val()) {
				that.node.setAttrEnabled(attribute, true, that.possibleValues(attribute)[0]);
				that.currentAttribute = attribute;
			} else {
				that.node.setAttrEnabled(attribute, false);
			}
		}
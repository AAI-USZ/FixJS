function (i, attribute) {
		if (attribute.enabled) {
			var attributeProperty = that.attributeUi[attribute.key];
			if (typeof attributeProperty !== "undefined") {
				console.log("attr = " + attribute.key);
				mainOption = attributeProperty.mainOption;
				that.mainOptionSelect.val(mainOption);
			}
		}
	}
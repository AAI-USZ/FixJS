function (cssClass, value) {
				var style = null;
				if (!this.pageTSconfiguration.disableStyleOnOptionLabel) {
					if (HTMLArea.classesValues[cssClass] && !HTMLArea.classesNoShow[cssClass]) {
						style = HTMLArea.classesValues[cssClass];
					} else if (/-[0-9]+$/.test(cssClass) && HTMLArea.classesValues[RegExp.leftContext + '-'])  {
						style = HTMLArea.classesValues[RegExp.leftContext + '-'];
					}
				}
				store.add(new store.recordType({
					text: value,
					value: cssClass,
					style: style
				}));
			}
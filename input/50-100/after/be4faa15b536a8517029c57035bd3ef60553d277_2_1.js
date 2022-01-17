function (cssClass, value) {
				store.add(new store.recordType({
					text: value,
					value: cssClass,
					style: (!(this.pageTSconfiguration && this.pageTSconfiguration.disableStyleOnOptionLabel) && HTMLArea.classesValues && HTMLArea.classesValues[cssClass] && !HTMLArea.classesNoShow[cssClass]) ? HTMLArea.classesValues[cssClass] : null
				}));
			}
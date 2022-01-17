function (cssClass, value) {
				store.add(new store.recordType({
					text: value,
					value: cssClass,
						// this.editor.config.disablePCexamples is deprecated as of TYPO3 4.6 and will be removed in TYPO 4.8
					style: (!(this.pageTSconfiguration && this.pageTSconfiguration.disableStyleOnOptionLabel) && !this.editor.config.disablePCexamples && HTMLArea.classesValues && HTMLArea.classesValues[cssClass] && !HTMLArea.classesNoShow[cssClass]) ? HTMLArea.classesValues[cssClass] : null
				}));
			}
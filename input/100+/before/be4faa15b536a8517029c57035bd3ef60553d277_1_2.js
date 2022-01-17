function (cssClass, value) {
				var style = null;
					// this.editor.config.disablePCexamples is deprecated as of TYPO3 4.6 and will be removed in TYPO 4.8
				if (!this.pageTSconfiguration.disableStyleOnOptionLabel && !this.editor.config.disablePCexamples) {
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
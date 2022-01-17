function () {
							buttonBack.hideMenu();
							SmartWFM.lib.Event.fire('', 'activateFolder', this.path, this.historyIndex);
						}
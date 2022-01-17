function(result) { // called on success
				this.addWindow.close();
				this.window.setLoading(false);
				this.controller.loadGroups([values['group']]);
			}
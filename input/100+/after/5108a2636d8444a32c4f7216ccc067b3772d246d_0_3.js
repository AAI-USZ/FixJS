function() { // called on success
				SmartWFM.lib.Event.fire('', 'refresh', values['path']);
				this.window.close();
			}
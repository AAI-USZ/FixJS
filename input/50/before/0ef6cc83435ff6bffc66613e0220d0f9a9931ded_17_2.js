function(e) {
					e = new Event(e);
					if(e.key == 'esc' && this.visible) this.hide(this.layout);
				}
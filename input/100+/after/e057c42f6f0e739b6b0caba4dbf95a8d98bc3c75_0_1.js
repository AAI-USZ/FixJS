function(evt) {
			var keyCode = evt && evt.keyCode || 0,
				code = this.textContent,
				id = this.id;

			if(keyCode < 9 || keyCode == 13 || keyCode > 32 && keyCode < 41) {
				$u.event.fire(this, 'caretmove');
			}
	
			if([
				9, 91, 93, 16, 17, 18, // modifiers
				20, // caps lock
				13, // Enter (handled by keydown)
				112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, // F[0-12]
				27 // Esc
			].indexOf(keyCode) > -1) {
				return;
			}
			
			// Show a previewer, if needed
			if(self.Previewer) {
				var selection = getSelection();
				
				if(selection.rangeCount) {
					var range = selection.getRangeAt(0),
						element = range.startContainer;
					
					if(element.nodeType == 3) {
						element = element.parentNode;
					}
					
					var type = Previewer.get(element);
					
					if(type) {
						Previewer.active = element;
						Previewer.s[type].token = element;
					}
					else {
						Previewer.hideAll();
						Previewer.active = null;
					}
				}
			}
			
			if(keyCode !== 37 && keyCode !== 39) {
				var ss = this.selectionStart,
					se = this.selectionEnd;
			
				Highlight.init(this);
				
				// Dirty fix to #2
				if(!/\n$/.test(code)) {
					this.innerHTML = this.innerHTML + '\n';
				}
	
				if(ss !== null || se !== null) {
					this.setSelectionRange(ss, se);
				}
				
				if(id === 'css') {
					document.title = Dabblet.title(code) + ' ✿ dabblet.com';
				
					Dabblet.update.CSS(code);
				}
				else {
					Dabblet.update.HTML(code);
				}
				
				if(keyCode) {
					gist.saved = false;
				}
			}
		}
function() {
						if(self.editor/* && self.editor.editor*/) {
							var text = $.wa_blog.editor.wysiwygToHtml(textarea.val());
							self.editor.setValue(text);
							self.editor.refresh();
						} else {
							if(typeof(console) == 'object') {
								console.log('wait for codemirror editor init');
							}
							self.show(textarea);
						}
					}
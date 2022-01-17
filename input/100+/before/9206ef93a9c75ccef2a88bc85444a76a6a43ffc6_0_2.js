function(textarea) {
					$('.CodeMirror-wrapping').show();
					var self = this;
					setTimeout(function() {
						if(self.editor && self.editor.editor) {
							var text = $.wa_blog.editor.wysiwygToHtml(textarea.val());
							self.editor.setCode(text);
						} else {
							if(typeof(console) == 'object') {
								console.log('wait for codemirror editor init');
							}
							self.show(textarea);
						}
					},100);

				}
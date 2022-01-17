function(textarea) {
					if(!this.inited) {

						this.inited = true;
						var options = $.wa_blog.editor.options;
						var container = $.wa_blog.editor.cloneTextarea(textarea,'#' + options['content_id']+'_wrapper','codemirror');
						var height = $.wa_blog.editor.calcEditorHeight();

						this.editor = CodeMirror.fromTextArea(
								document.getElementById(container), {
									mode: "text/html",
									tabMode: "indent",
									height: "dynamic",
									lineWrapping: true,
									minHeight : height,
									initCallback: function (editor) {
										setTimeout(function() {
											try{
												editor.frame.contentWindow.document.addEventListener('keydown', $.wa_blog.editor.editorKeyCallback(), false);
												editor.frame.contentWindow.document.addEventListener('keypress', $.wa_blog.editor.editorKeyCallback(true), false);
											} catch(e) {
												$.wa_blog.editor.log('Exception: '+e.message + '\nline: '+e.fileName+':'+e.lineNumber);
											}
										},100);
									}
								}
						);
						$('#post_text_wrapper .CodeMirror-scroll').height(this.correctEditorHeight(height));
					}

					return true;
				}
function(textarea) {
					if(!this.inited) {

						this.inited = true;
						var options = $.wa_blog.editor.options;
						var container = $.wa_blog.editor.cloneTextarea(textarea,'#' + options['content_id']+'_wrapper','codemirror');
						var height = $.wa_blog.editor.calcEditorHeight();

						this.editor = CodeMirror.fromTextArea(
								''+container, {
									minHeight : height,
//									height : "dynamic",
									parserfile : ["parsexml.js", "parsecss.js",
											"tokenizejavascript.js",
											"parsejavascript.js",
											"parsehtmlmixed.js"],
									stylesheet : [
											options['wa_url']
													+ "wa-content/js/codemirror/1/css/xmlcolors.css",
											options['wa_url']
													+ "wa-content/js/codemirror/1/css/jscolors.css",
											options['wa_url']
													+ "wa-content/js/codemirror/1/css/csscolors.css"],
									path : options['wa_url']
											+ "wa-content/js/codemirror/1/js/",
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
						$('#post_text_wrapper .CodeMirror-wrapping').height(this.correctEditorHeight(height));
					}

					return true;
				}
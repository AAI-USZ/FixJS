function(status, response) {
				/* we may want to implement an error threshold system for errors 
				like the old notebook had. that would go here */
				
				if(response === "") {
					// empty response, try again after a little bit
					// setTimeout(_this.check_for_output, 500);
					return;
				}
				
				var X = decode_response(response);
				
				if(X.status === "e") {
					// there was an error, stop checking
					_this.worksheet.show_connection_error();
					stop_checking();
					return;
				}
				
				if(X.status === "d") {
					// evaluation done
					
					stop_checking();
					
					/* NOTE I'm not exactly sure what the interrupted property is for 
					* so I'm not sure that this is necessary 
					*/
					/*
					if(X.interrupted === "restart") {
						// restart_sage()
					}
					else if(X.interrupted === "false") {
						
					}
					else {
						
					}
					*/
					
					if(X.new_input !== "") {
						// if the editor has changed, re-introspect
						if(_this.codemirror.getValue() !== _this.introspect_state.previous_value) {
							setTimeout(_this.introspect, 50);
							return;
						}
						
						// update the input
						_this.input = X.new_input;
						
						// update codemirror/tinymce
						if(_this.is_evaluate_cell) {
							_this.codemirror.setValue(_this.input);
							
							// here we need to set the new cursor position if 
							// we are in introspect
							if(_this.introspect_state) {
								var after_lines = _this.introspect_state.after_cursor.split("\n");
								var val_lines = _this.codemirror.getValue().split("\n");
								
								var pos = {};
								pos.line = val_lines.length - after_lines.length;
								pos.ch = val_lines[pos.line].length - after_lines[0].length;
								
								_this.codemirror.setCursor(pos);
							}
						} else {
							/* I don't think we need to do anything for TinyMCE
							 * but it would go here
							 */
						}
					}
					
					// introspect
					if(X.introspect_output && $.trim(X.introspect_output).length > 0) {
						if(_this.introspect_state.code_completion) {
							// open codemirror simple hint
							var editor = _this.codemirror;

							/* stolen from simpleHint */
							// We want a single cursor position.
							// if (editor.somethingSelected()) return;
							
							//var result = getHints(editor);
							//if (!result || !result.list.length) return;
							var completions = $.trim(X.introspect_output).split("\n");
							
							/* Insert the given completion str into the input */
							function insert(str) {
								// we can take this out in the next release of CodeMirror
								str = str.replace("\r", "");

								var newpos = {};
								var lines = _this.introspect_state.before_replacing_word.split("\n");
								newpos.line = lines.length - 1;
								newpos.ch = lines[lines.length - 1].length + str.length;
								
								editor.setValue(_this.introspect_state.before_replacing_word + str + _this.introspect_state.after_cursor);
								
								editor.setCursor(newpos);
							}
							
							// When there is only one completion, use it directly.
							// TODO we can't do return here since more commands come after introspection stuff
							if (completions.length === 1) {insert(completions[0]); return true;}
							
							// Build the select widget
							/* Because this code is stolen directly from simple-hint.js
							* it does not use jQuery for any of the DOM manipulation.
							*/
							var complete = document.createElement("div");
							complete.className = "CodeMirror-completions";
							var sel = complete.appendChild(document.createElement("select"));
							// Opera doesn't move the selection when pressing up/down in a
							// multi-select, but it does properly support the size property on
							// single-selects, so no multi-select is necessary.
							if (!window.opera) sel.multiple = true;
							for (var i = 0; i < completions.length; ++i) {
								var opt = sel.appendChild(document.createElement("option"));
								opt.appendChild(document.createTextNode(completions[i]));
							}
							sel.firstChild.selected = true;
							sel.size = Math.min(10, completions.length);
							var pos = editor.cursorCoords();
							complete.style.left = pos.x + "px";
							complete.style.top = pos.yBot + "px";
							document.body.appendChild(complete);
							// If we're at the edge of the screen, then we want the menu to appear on the left of the cursor.
							var winW = window.innerWidth || Math.max(document.body.offsetWidth, document.documentElement.offsetWidth);
							if(winW - pos.x < sel.clientWidth)
							complete.style.left = (pos.x - sel.clientWidth) + "px";
							// Hack to hide the scrollbar.
							if (completions.length <= 10)
							complete.style.width = (sel.clientWidth - 1) + "px";

							
							/* Close the completions menu */
							var done = false;
							function close() {
								if (done) return;
								done = true;
								complete.parentNode.removeChild(complete);
							}
							
							/* Pick and insert the currently highlighted completion */
							function pick() {
								insert(completions[sel.selectedIndex]);
								close();
								setTimeout(function(){editor.focus();}, 50);
							}
							
							CodeMirror.connect(sel, "blur", close);
							CodeMirror.connect(sel, "keydown", function(event) {
								var code = event.keyCode;
								// Enter
								if (code === 13) {CodeMirror.e_stop(event); pick();}
								
								// Escape
								else if (code === 27) {CodeMirror.e_stop(event); close(); editor.focus();}
								
								// Backspace
								else if (code === 8) {
									close();
									editor.focus();
									editor.triggerOnKeyDown(event);
								}
								
								// Everything else besides up/down
								else if (code !== 38 && code !== 40) {
									close(); editor.focus();
									
									// Pass the event to the CodeMirror instance so that it can handle things like backspace properly.
									editor.triggerOnKeyDown(event);
									
									setTimeout(_this.introspect, 50);
								}
							});
							CodeMirror.connect(sel, "dblclick", pick);

							sel.focus();
							// Opera sometimes ignores focusing a freshly created node
							if (window.opera) setTimeout(function(){if (!done) sel.focus();}, 100);
							//return true;
						}
						else {
							// docstring
							_this.show_popover($.trim(X.introspect_output));
						}
					}
					
					// update the output
					_this.output = X.output;
					
					// check for output_html
					// it doesn't seem right to have a different property here
					// it seems like X.output is sufficient
					if($.trim(X.output_html) !== "") {
						_this.output = X.output_html;
					}
					
					// render to the DOM
					_this.render_output();
					
					// EVALUATE ALL STUFF
					_this.continue_evaluating_all();
				}
			}
function insert(str) {
								var newpos = {};
								var lines = _this.introspect_state.before_replacing_word.split("\n");
								newpos.line = lines.length - 1;
								newpos.ch = lines[lines.length - 1].length + str.length;
								
								editor.setValue(_this.introspect_state.before_replacing_word + str + _this.introspect_state.after_cursor);
								
								editor.setCursor(newpos);
							}
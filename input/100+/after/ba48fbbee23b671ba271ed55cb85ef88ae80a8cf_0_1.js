function() {
		/* Attempts to begin an introspection. Firstly, it splits the input 
		 * according to the cursor position. Then it matches the text before 
		 * the cursor to some regex expression to check which type of 
		 * introspection we are doing. Once it determines the type of introspection,
		 * it stores some properties in the introspect_state variable. If 
		 * there is nothing to introspect, it returns false. Otherwise, 
		 * it executes the introspection and returns true. Handling of the 
		 * introspection result is done in the check_for_output function.
		 */
		
		if(!_this.is_evaluate_cell) return;
		
		/* split up the text cell and get before and after */
		var before = "";
		var after = "";
		
		var pos = _this.codemirror.getCursor(false);
		var lines = _this.codemirror.getValue().split("\n");
		
		before += lines.slice(0, pos.line).join("\n");
		if(pos.ch > 0) {
			if(pos.line > 0) {
				before += "\n";
			}
			before += lines[pos.line].substring(0, pos.ch);
		}
		
		after += lines[pos.line].substring(pos.ch);
		if(pos.line < lines.length - 1) {
			after += "\n";
			after += lines.slice(pos.line + 1).join("\n");
		}
		
		
		/* set up introspection state */
		_this.introspect_state = {};
		_this.introspect_state.before_replacing_word = before;
		_this.introspect_state.after_cursor = after;
		_this.introspect_state.previous_value = _this.codemirror.getValue();
		
		/* Regexes */
		var command_pat = "([a-zA-Z_][a-zA-Z._0-9]*)$";
		var function_pat = "([a-zA-Z_][a-zA-Z._0-9]*)\\([^()]*$";
		try {
			command_pat = new RegExp(command_pat);
			function_pat = new RegExp(function_pat);
		} catch (e) {}
		
		m = command_pat.exec(before);
		f = function_pat.exec(before);
		
		if (before.slice(-1) === "?") {
			// We're starting with a docstring or source code.
			_this.introspect_state.docstring = true;
		} else if (m) {
			// We're starting with a list of completions.
			_this.introspect_state.code_completion = true;
			_this.introspect_state.replacing_word = m[1];
			_this.introspect_state.before_replacing_word = before.substring(0, before.length - m[1].length);
		} else if (f !== null) {
			// We're in an open function paren -- give info on the
			// function.
			before = f[1] + "?";
			// We're starting with a docstring or source code.
			_this.introspect_state.docstring = true;
		} else {
			// Just a tab.
			return false;
		}
		
		sagenb.async_request(_this.worksheet.worksheet_command("introspect"), sagenb.generic_callback(function(status, response) {
			/* INTROSPECT CALLBACK */
			
			// start checking for output
			_this.check_for_output();
		}),
		
		/* REQUEST OPTIONS */
		{
			id: toint(_this.id),
			before_cursor: before,
			after_cursor: after
		});
		
		return true;
	}
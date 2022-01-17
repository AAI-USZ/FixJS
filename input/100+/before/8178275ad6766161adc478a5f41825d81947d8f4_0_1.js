function(container) {
		if(_this.is_evaluate_cell) {
			// its an evaluate cell
		
			// render into the container
			$(container).html("<div class=\"cell evaluate_cell\" id=\"cell_" + _this.id + "\">" +
									"<div class=\"input_cell\">" +
									"</div>" +
								"</div> <!-- /cell -->");
			
			//set up extraKeys object
			/* because of some codemirror or chrome bug, we have to
			 * use = new Object(); instead of = {}; When we use = {};
			 * all of the key events are automatically passed to codemirror.
			 */
			var extrakeys = new Object();
			
			// set up autocomplete. we may want to use tab
			//extrakeys[sagenb.ctrlkey + "-Space"] = "autocomplete";
			extrakeys[sagenb.ctrlkey + "-Space"] = function(cm) {
				_this.introspect();
			};
			
			extrakeys["Tab"] = function(cm) {
				if(cm.getCursor(true).line != cm.getCursor().line) {
					// multiple lines selected
					CodeMirror.commands.indentMore(cm);
				} else if(!_this.introspect()) {
					console.log('indentAuto');
					CodeMirror.commands.indentAuto(cm);
				}
			};
			
			extrakeys["Shift-Tab"] = "indentLess";
			
			/*extrakeys["("] = function(cm) {
				_this.introspect();
			};*/
			
			// backspace handler
			extrakeys["Backspace"] = function(cm) {
				// check if it is empty
			
				// all of this is disabled for now
				if(cm.getValue() === "" && _this.worksheet.cells.length > 0) {
					// it's empty and not the only one -> delete it
					_this.delete();
					_this.worksheet.focused_texarea_id = -1;
				} else {
					// not empty -> pass to the default behaviour
					throw CodeMirror.Pass;
				}
			};
			
			extrakeys["Shift-Enter"] = function(cm) {
				_this.evaluate();
			};
			
			extrakeys[sagenb.ctrlkey + "-N"] = function(cm) {
				_this.worksheet.new_worksheet();
			};
			extrakeys[sagenb.ctrlkey + "-S"] = function(cm) {
				_this.worksheet.save();
			};
			extrakeys[sagenb.ctrlkey + "-W"] = function(cm) {
				_this.worksheet.close();
			};
			extrakeys[sagenb.ctrlkey + "-P"] = function(cm) {
				_this.worksheet.print();
			};
			
			extrakeys["F1"] = function() {
				_this.worksheet.open_help();
			};
			
			// create the codemirror
			_this.codemirror = CodeMirror($(container).find(".input_cell")[0], {
				value: _this.input,
				
				/* some of these may need to be settings */
				indentWithTabs: false,
				tabSize: 4,
				indentUnit: 4,
				lineNumbers: false,
				matchBrackets: true,
				
				mode: _this.get_codemirror_mode(),
				
				/* autofocus messes up when true */
				autofocus: false,
			
				onFocus: function() {
					// may need to make sagenb.async_request here
					_this.worksheet.current_cell_id = _this.id;
					
					// unhide
					$("#cell_" + _this.id + " .input_cell").removeClass("input_hidden");
				},
				onBlur: function() {
					_this.worksheet.current_cell_id = -1;
					if(_this.input !== _this.codemirror.getValue()) {
						// the input has changed since the user focused
						// so we send it back to the server
						_this.send_input();
					}
					
					// update cell properties without rendering
					_this.update();
				},
			
				extraKeys: extrakeys
			});
			
			/* we may want to focus this cell here */
			
			// render the output
			_this.render_output();
		}
		else {
			// its a text cell
			$(container).html("<div class=\"cell text_cell\" id=\"cell_" + _this.id + "\">" + 
									"<div class=\"view_text\">" + _this.input + "</div>" + 
									"<div class=\"edit_text\">" + 
										"<textarea name=\"text_cell_textarea_" + _this.id + "\" id=\"text_cell_textarea_" + _this.id + "\">" + _this.input + "</textarea>" + 
										"<div class=\"buttons\">" + 
											"<button class=\"btn btn-danger delete_button pull-left\">Delete</button>" + 
											"<button class=\"btn cancel_button\">Cancel</button>" + 
											"<button class=\"btn btn-primary save_button\">Save</button>" + 
										"</div>" + 
									"</div>" + 
								"</div> <!-- /cell -->");
			
			
			// init tinyMCE
			// we may want to customize the editor some to include other buttons/features
			tinyMCE.init({
				mode: "exact",
				elements: ("text_cell_textarea_" + _this.id),
				theme: "advanced",
				
				width: "100%",
				height: "300"
			});
			
			var $_this = $("#cell_" + _this.id);
			
			// MathJax the text
			MathJax.Hub.Queue(["Typeset", MathJax.Hub, $_this.find(".view_text")[0]]);
			
			$_this.dblclick(function(e) {
				if(!_this.is_evaluate_cell) {
					// set the current_cell_id
					_this.worksheet.current_cell_id = _this.id;
					
					// lose any selection that was made
					if (window.getSelection) {
						window.getSelection().removeAllRanges();
					} else if (document.selection) {
						document.selection.empty();
					}
					
					// add the edit class
					$("#cell_" + _this.id).addClass("edit");
				}
			});
			
			$_this.find(".delete_button").click(_this.delete);
			
			$_this.find(".cancel_button").click(function(e) {
				// get tinymce instance
				var ed = tinyMCE.get("text_cell_textarea_" + _this.id);
				
				// revert the text
				ed.setContent(_this.input);
				
				// remove the edit class
				$("#cell_" + _this.id).removeClass("edit");
			});
			
			$_this.find(".save_button").click(function(e) {
				// get tinymce instance
				var ed = tinyMCE.get("text_cell_textarea_" + _this.id);
				
				// send input
				_this.send_input();
				
				// update the cell
				$_this.find(".view_text").html(_this.input);
				
				// MathJax the text
				MathJax.Hub.Queue(["Typeset", MathJax.Hub, $_this.find(".view_text")[0]]);
				
				// remove the edit class
				$("#cell_" + _this.id).removeClass("edit");
			});
		}
	}
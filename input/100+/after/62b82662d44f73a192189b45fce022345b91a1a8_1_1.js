function() {
			// First check for valid 'styled_file_id' option.
			if (options.styled_file_id == null) {
				alert('StyledFileInput widget: no "styled_file_id" option was passed.');
				return;
			}
			linked_file_input_box.addClass('styled_file_input');
			
			// Create the replacement widget elements.
			replacement_container_div = $("<div class='styled_file_input' id='"+options.styled_file_id+"'></div>");
			selected_file_name_span = $("<span class='styled_file_input_filename'></span>");
			browse_button = $("<button class='styled_file_input_browse_btn' id='"+options.styled_file_id+"BrowseBtn' type='button'>Browse...</button>");
			
			replacement_container_div.append(selected_file_name_span);
			
			if (options.widget_height != null) {
				linked_file_input_box.css({height:options.widget_height + "px"});
				replacement_container_div.css({height:options.widget_height + "px"});
				if ($.browser.msie && parseInt($.browser.version) <= 8) {
					replacement_container_div.css({lineHeight:options.widget_height + "px"});
					linked_file_input_box.css({lineHeight:options.widget_height + "px"});
				}
				else {
					replacement_container_div.css({lineHeight:(parseInt(options.widget_height)-2) + "px"});
					linked_file_input_box.css({lineHeight:(parseInt(options.widget_height)-2) + "px"});
				}
			}
			
			// Add optional classes.
			if (options.classes.length > 0) {
				for (var i = 0; i < options.classes.length; i++) {
					replacement_container_div.addClass(options.classes[i]);
				}
			}
			
			// Add the new replacement widget.
			linked_file_input_box.after(replacement_container_div);
			replacement_container_div.after(browse_button);
			
			if (options.use_jquery_ui == true && $.ui !== undefined) {
				// If jQueryUI is being used, turn the browse button into a jQueryUI Button element
				browse_button.button().on('click', this.triggerLinkedInputBoxClick);
			}
			else {
				browse_button.on('click', this.triggerLinkedInputBoxClick);
			}
			
			// Add the event handler(s).
			replacement_container_div.on('click', this.triggerLinkedInputBoxClick);
			linked_file_input_box.on('change', this.setCurrentFileNameText);
		}
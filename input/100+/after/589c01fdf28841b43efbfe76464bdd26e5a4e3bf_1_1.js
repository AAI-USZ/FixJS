function() {
			// First check for valid 'styled_select_id' option.
			if (options.styled_select_id == null) {
				alert('StyledSelectBox widget: no "styled_select_id" option was passed.');
				return;
			}
			// Next check for required options.
			if (options.image_base == null) {
				alert('StyledSelectBox widget: no image base specified.');
				return;
			}
			
			// Create the replacement widget elements.
			replacement_container_div = $("<div class='styled_select' id='"+options.styled_select_id+"'></div>");
			selected_option_div = $("<div class='styled_select_option_display'></div");
			arrow_span = $("<span class='styled_select_arrow'>&nbsp;</span>").css({backgroundImage:'url('+options.image_base+'/small-arrow.png'+')'});
			
			if (options.include_separator_border) {
				// Only add the border if we specify to do so
				var arrow_left_border = replacement_container_div.css('border-left-width') + ' ' + replacement_container_div.css('border-left-style') + ' ' + replacement_container_div.css('border-left-color');
				arrow_span.css({borderLeft: arrow_left_border});
			}
			
			replacement_container_div.append(selected_option_div).append(arrow_span);
			linked_select_box.addClass('original_select_now_styled');
			
			if (options.z_index != null) {
				replacement_container_div.css({zIndex: options.z_index});
				linked_select_box.css({zIndex: (options.z_index+1)});
			}
			
			// Set the calculated widths
			replacement_container_div.css({width:linked_select_box.outerWidth()+'px'});
			selected_option_div.css({width:(parseInt(replacement_container_div.innerWidth()-arrow_span.outerWidth()))+'px'});
			
			// Set the heights
			if (options.widget_height != null) {
				linked_select_box.css({height:options.widget_height + "px",
									   lineHeight:(parseInt(options.widget_height)-2) + "px"});
				replacement_container_div.css({height:options.widget_height + "px"});
				selected_option_div.css({height:options.widget_height + "px"});
				if ($.browser.msie && parseInt($.browser.version) <= 8) {
					replacement_container_div.css({lineHeight:options.widget_height + "px"});
				}
				else {
					replacement_container_div.css({lineHeight:(parseInt(options.widget_height)-2) + "px"});
				}
			}
			else {
				selected_option_div.css({height:linked_select_box.height() + "px"});
			}
			
			// Add optional classes.
			if (options.classes.length > 0) {
				for (var i = 0; i < options.classes.length; i++) {
					replacement_container_div.addClass(options.classes[i]);
				}
			}
			
			// Add the new replacement widget.
			linked_select_box.after(replacement_container_div);
			
			// Add the event handler(s).
			linked_select_box.on('change', this.setCurrentSelectedText);
			
			// Determine the option text to show.
			this.setCurrentSelectedText();
		}
function(options) {
		//--------------------------------------------------------------------------
		//
		//  Variables and get/set functions
		//
		//--------------------------------------------------------------------------
		
		/**
		 * Default options for the widget. Overwrite by including individual
		 * options in the 'options' map object when extending the styledFileInput widget.
		 *
		 * @access		public
		 * @type		Object
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 */
		var default_options = {
			styled_file_id : null,					// ID of the new element that'll be created. Default null. Required.
			use_jquery_ui : true,					// Flag whether to use jQueryUI for the replacement Browse button. Default true. Optional.
			classes : [],							// A set of additional class names that will get applied to the replacement 'styled_file_input' <div>. Default []. Optional.
			widget_height : null					// The height of the widget in pixels. Default null. Optional.
		};
		options = $.extend(default_options, options);
		
		/**
		 * The <input> file element which will be overlaid by the new widget.
		 *
		 * @access		public
		 * @type		HTMLElement <input>
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 * @default		this
		 */
		var linked_file_input_box = this;
		
		/**
		 * The replacement 'styled_file_input' <div> element that will visually replace
		 * the linked_file_input_box <input> element.
		 *
		 * @access		public
		 * @type		HTMLElement <div>
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 * @default		null
		 */
		var replacement_container_div = null;
		
		/**
		 * The 'styled_file_input_filename' <span> element that contains the text
		 * of the currently selected <select> widget <option> value.
		 *
		 * @access		public
		 * @type		HTMLElement <span>
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 * @default		null
		 */
		var selected_file_name_span = null;
		
		/**
		 * The 'browse_button' <button> element that contains the new 'Browse' button.
		 *
		 * @access		public
		 * @type		HTMLElement <button>
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 * @default		null
		 */
		var browse_button = null;
		
		//--------------------------------------------------------------------------
		//
		//  Methods
		//
		//--------------------------------------------------------------------------
		
		/**
		 * Initializes the styled file input widget. Creates and adds any optional classes
		 * to the new 'styled_file_input' <div>, creates and adds its children, sets the
		 * new Browse button, determines the height of the new widget based on the height
		 * of the original <input> widget, and creates the event handler for selecting
		 * a file from the dialog.
		 *
		 * @access		public
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 */
		this.initStyledFileInput = function() {
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
				browse_button.button();
			}
			
			// Add the event handler(s).
			replacement_container_div.on('click', function() { linked_file_input_box.trigger('click'); });
			browse_button.on('click', function() { linked_file_input_box.trigger('click'); });
			linked_file_input_box.on('change', this.setCurrentFileNameText);
		}
		
		/********* Event handlers *********/
		
		/**
		 * When the user selects a file from the dialog box, it will update the
		 * 'styled_file_input_filename' <span> element with the text of the newly
		 * file name.
		 *
		 * @public
		 * @memberOf	StyledFileInput
		 * @since		1.0
		 *
		 * @param		change_event			jQuery.Event				jQuery 'change' Event
		 */
		this.setCurrentFileNameText = function(change_event) {
			var file_name = linked_file_input_box.prop('value');
			replacement_container_div.find('span.styled_file_input_filename').html(file_name).attr('title', file_name);
			linked_file_input_box.blur();
		}
		
		/********* Initialize the styled file input *********/
		this.initStyledFileInput();
		
		/********* Return the newly extended element for chaining *********/
		return this;
	}
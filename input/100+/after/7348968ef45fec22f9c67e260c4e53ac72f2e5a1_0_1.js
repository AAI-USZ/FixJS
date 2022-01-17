function(evt) {	 	  
		if (!this.is_disabled) {

			var target_closelink = evt != null ? dojo.hasClass(evt.target, 'search-choice-close') : false;
			if (evt && evt.type === "mousedown") {
				evt.stopPropagation();
			}

			if (!this.pending_destroy_click && !target_closelink) {						
				if (!this.active_field) {
					if (this.is_multiple) {
						dojo.setAttr(this.search_field, 'value', '');
					}
																			
					this.document_click_handle = dojo.connect(document, 'click', this, 'test_active_click');

					this.results_show();
				} else if (!this.is_multiple && evt && (evt.target === this.selected_item || dojo.query(evt.target).parents('a.chzn-single').length)) {
					evt.preventDefault();
					this.results_toggle();
				}
				this.activate_field();
			} else {
				this.pending_destroy_click = false;
			}
		}
	
	}
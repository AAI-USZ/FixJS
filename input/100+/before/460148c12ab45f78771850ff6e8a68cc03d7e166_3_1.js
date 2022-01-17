function() {
				// Move from inner to outer layouts. Some of the elements might not exist.
				// Not all edit forms are layouted, so qualify by their data value.
				this.find('.cms-content-fields[data-layout-type]').redraw(); 
				this.find('.cms-edit-form[data-layout-type]').redraw(); 
				
				// Only redraw preview if its visible
				this.find('.cms-preview').redraw();

				// Only redraw the content area if its not the same as the edit form
				var contentEl = this.find('.cms-content');
				if(!contentEl.is('.cms-edit-form')) contentEl.redraw();
				
				this.layout({resize: false});
		
				this.find('.cms-panel-layout').redraw(); // sidebar panels.
			}
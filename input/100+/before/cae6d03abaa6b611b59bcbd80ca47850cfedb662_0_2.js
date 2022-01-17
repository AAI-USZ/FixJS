function(event) {	// replaces the gallery with gallery editor
		event.stop();
		
		// Destroys and disposes of newEntryContentTip		
		if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'entry_content')  {
			$$('.xTipNewEntryContent').destroy(); $$('.xTipNewEntryContent').dispose();
		}
		
		
		var galleryContainer = $(event.target).getParent('.xGalleryContainer');
		
		var galleryInstance, galleryInstanceIndex;
		if(this.galleries.some(function(item, index) { 
			//console.debug(item.container, galleryContainer, $(item.container) == $(galleryContainer));
			// if the containers match then this is the right gallery instance
			if($(item.container) == $(galleryContainer)) {
				galleryInstance = item;
				galleryInstanceIndex = index;
				return true;
			}
			return false;
		})) {
			
			// remove the gallery instance
			galleryInstance.detach();
			this.galleries.splice(galleryInstanceIndex, 1);
			
			// instantiate the gallery editor
			var bGEditor = new BertaGalleryEditor(galleryContainer, { 
				engineRoot: this.options.paths.engineRoot,
				flashUploadEnabled: this.options.flashUploadEnabled
			});
			//this.processHandler.addObservable(bGEditor);
			this.galleryEditors.push(bGEditor);

			bGEditor.addEvent('load', function() {
				this.fireEvent(BertaEditorBase.EDITABLE_START, [galleryContainer, bGEditor]);
			}.bind(this));

			// onClose destroys the editor, removes its instance and loads the gallery back
			bGEditor.addEvent('close', function() {
				//this.processHandler.removeObservable(bGEditor);
				var eIdx = this.galleryEditors.indexOf(bGEditor);
				if(eIdx >= 0) {
					this.galleryEditors.splice(eIdx);
				}
				bGEditor = null;
				
				this.galleryLoad(galleryContainer);
				
				if(this.options.templateName.substr(0,5) == 'messy') {
					$$('.xCreateNewEntry').show();
					$('xTopPanelContainer').show();
					$('xBgEditorPanelTrigContainer').show();
					$$('.xEntry .xCreateNewEntry').hide();
				}
				
			}.bind(this));
		}
	}
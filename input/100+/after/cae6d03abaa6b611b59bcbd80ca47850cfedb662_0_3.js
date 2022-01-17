function(resp) {
				container.removeClass('xSavingAtLarge');
								
				// for some mysterious reason, mootools somehow looses track of what is what
				container = container.getElement('.xGalleryEditButton').getParent('.xGalleryContainer');
			
				// instantiate the gallery for the container
				var g = new BertaGallery(container, { 
					environment: this.options.environment,
					engineRoot: this.options.paths.engineRoot, 
					engineABSRoot: this.options.paths.engineABSRoot, 
					playerType: this.options.videoPlayerType,
					slideshowAutoRewind: this.options.slideshowAutoRewind });
				this.galleries.push(g);
				
				// add the "edit gallery" link event
				container.getElement('.xGalleryEditButton').addEvent('click', this.onGalleryEditClick.bindWithEvent(this));
				
				this.fireEvent(BertaEditorBase.EDITABLE_FINISH, [container]);

			}
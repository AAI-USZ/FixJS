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
				
				// Template design tip
				if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'entry_content' &&
				   this.container.getElements('.xEntry .xEntryEditWrap .xGalleryHasImages').length > 0) {
					
					$('xTopPanelContainer').show();
					
					Cookie.write('_berta_tips', 'template_design', {duration: 365, path: '/'});
					
					var templateDesign_tip_anchor = document.getElementById('xTemplateDesign');
							
					var templateDesignTip = new Tips(templateDesign_tip_anchor, {
					    fixed: true,
					    className: 'xTipTemplateDesign',
					    offset: {'x': 30, 'y': 20},
					    onHide: function(tip, el) {
					    	tip.show();
					    }
					});
					
					templateDesign_tip_anchor.store('tip:title', this.options.i18n.templateDesignTip_title);
					templateDesign_tip_anchor.store('tip:text', this.options.i18n.templateDesignTip_text);
					    
					templateDesign_tip_anchor.fireEvent('mouseenter');
					
					templateDesign_tip_anchor.addEvent('click', function() {
						Cookie.write('_berta_tips', 'settings', {duration: 365, path: '/'});
					});
				}
				
			}
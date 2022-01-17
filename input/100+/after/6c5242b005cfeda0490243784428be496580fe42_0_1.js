function() {

		this.edittingMode = $$('body')[0].get('x_mode');
		if(!this.edittingMode) this.edittingMode = 'entries';
		
		// init news ticker
		this.initNewsTicker();

		switch(this.edittingMode) {
						
			case 'settings':
			
				this.editablesInit();
				
				// action links
				$$(this.options.xActionClass).each(function(el) {
					this.elementEdit_init(el, this.options.xBertaEditorClassAction);
				}, this);
				
				var maxH = 0;
				if($('settingsTabs')) {
					var tabsDims = $('settingsTabs').getSize();
					$('settingsContentContainer').getElements('.settingsContent').each(function(el) {
						var dims = el.getSize();
						maxH = Math.max(maxH, dims.y);
						el.setStyle('top', (tabsDims.y) + 'px');
					});
					$('settingsContentContainer').setStyle('height', (maxH + 20) + 'px');
					this.tabsInit.delay(300);
				}
				
				if($('xNewsTickerContainer')) this.hideNewsTicker();

				break;
			
			case 'entries':
			default:
				
				this.container = document.getElementById('contentContainer');
				this.entriesList = $$('.xEntriesList')[0];
				
				// section background editing
				if($('xBgEditorPanelTrig')) $('xBgEditorPanelTrig').addEvent('click', this.onBgEditClick.bindWithEvent(this));

				if(this.newsTickerContainer) {
					this.hideNewsTicker.delay(7000);
				}

				// Tutorial videos
				this.bertaVideosInit();	
				
				if(this.entriesList) {
				
					this.currentSection = this.entriesList.getClassStoredValue('xSection');
					this.currentTag = this.entriesList.getClassStoredValue('xTag');								
					
					if(this.currentSection) {
						this.entriesList.getElements('.xEntry .xEntryEditWrap').addEvent('mouseenter', this.entryOnHover.bindWithEvent(this));
						this.entriesList.getElements('.xEntry .xEntryEditWrap').addEvent('mouseleave', this.entryOnUnHover.bindWithEvent(this));
				
						this.entriesList.getElements('.xEntry .xEntryDropdown').addEvent('mouseenter', this.entryDropdownToggle.bindWithEvent(this));
						this.entriesList.getElements('.xEntry .xEntryDropdown').addEvent('click', this.entryDropdownToggle.bindWithEvent(this));

                        if($$('.subMenu')) this.subMenu = $$('.subMenu');
                        if(this.subMenu) this.submenuSortingInit();
												
						this.entriesList.getElements('.xEntry .xEntryDropdownBox').addEvents({
						 	mouseleave: function(event){
						 		this.removeClass('xVisible');
								dropdown = this.getParent().getElement('.xEntryDropdown');
								dropdown.removeClass('xEntryDropdowHover');						    
						    }														
						});												

						// entry deleting and creating
						if(this.options.templateName.substr(0,5) != 'messy')
							createNewEntryText = this.options.i18n['create new entry here'];
						else
							createNewEntryText = this.options.i18n['create new entry'];
						new Element('A', { 'class': 'xCreateNewEntry xPanel xAction-entryCreateNew', 'href': '#'}).adopt(
							new Element('span', { 'html': createNewEntryText })
						).inject(this.entriesList, 'after');
						$$('.xEntryDelete').addEvent('click', this.entryDelete.bindWithEvent(this));
						$$('.xCreateNewEntry').addEvent('click', this.entryCreate.bindWithEvent(this));
						
						// galleries
						this.entriesList.getElements('.xGalleryContainer').each(function(item) {
							var g = new BertaGallery(item, { 
								environment: this.options.environment,
								engineRoot: this.options.paths.engineRoot, 
								engineABSRoot: this.options.paths.engineABSRoot, 
								playerType: this.options.videoPlayerType,
								slideshowAutoRewind: this.options.slideshowAutoRewind });
							this.galleries.push(g);
						}.bind(this));
						this.entriesList.getElements('.xGalleryEditButton').addEvent('click', this.onGalleryEditClick.bindWithEvent(this));
				
						// editables
						this.editablesInit();
				
						// entry sorting
						if(!this.entriesList.hasClass('xNoEntryOrdering')) {
							this.orderSortables = new Sortables(this.entriesList, {
							    handle: '.xEntryMove',
								constrain: true,
							    clone: true,
								opacity: 0.3,
							    revert: true,
								onComplete: function(el) {
									this.entriesList.getElements('.xCreateNewEntry').setStyle('visibility', 'visible');
									this.entryOrderSave(el);
								}.bind(this),
								onStart: function(el, clone) { 
									this.entriesList.getElements('.xCreateNewEntry').setStyle('visibility', 'hidden');
								}.bind(this)
							});
						}
						
						this.highlightNewEntry.delay(100, this);

					} else if(!this.currentSection) {
                        this.container.getElement('h1').hide();
					}
				} else {
					this.editablesInit();
				}
				break;
		} 

	}
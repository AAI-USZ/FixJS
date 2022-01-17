function() {
		// Berta Background
		this.bgContainer = $('xBackground');
        this.bgLoader = $('xBackgroundLoader');
        
		if(this.bgContainer)  {
            this.bgImage = this.bgContainer.getElement('.visual-image img');
            this.bgCaption = this.bgContainer.getElement('.visual-caption');
			
			this.bgGridViewTrigger = $('xGridViewTrigger');
			this.bgNext = $('xBackgroundNext');
			this.bgPrevious = $('xBackgroundPrevious');
			this.bgRightCounter = $('xBackgroundRightCounter');
			this.bgLeftCounter = $('xBackgroundLeftCounter');

            if(this.bgImage || this.bgCaption) {
                var bertaBackground = new BertaBackground();
                this.fadeContent = this.bgContainer.getClassStoredValue('xBgDataFading');
            }

            if(this.bgImage) {
                this.bgImage.setStyle('display', 'none');
                this.bgLoader.setStyle('display', 'block');
            }
        }
		
        // Grid view
		if($('xGridView')) {
			$$('.xGridItem').addEvent('click', function() {
                _berta_grid_img_link = this.src.substr(this.src.lastIndexOf('/')+2);
                _berta_grid_img_link = _berta_grid_img_link.substr(_berta_grid_img_link.indexOf('_')+1);
                Cookie.write('_berta_grid_img_link', _berta_grid_img_link, {duration: 0});
			});
		}

		if(this.bgGridViewTrigger) {
			this.bgGridViewTrigger.addEvent('click', function() {
				Cookie.write('_berta_grid_view', 'berta_grid_view', {duration: 0});
			});
            
            // Key events
            window.addEvent('keydown', function(event) {
                if(event.key == 'up') {
                    this.bgGridViewTrigger.fireEvent('click');
                    window.location.href = this.bgGridViewTrigger.get('href');
                }
            }.bind(this)); 
        }

        if(Cookie.read('_berta_grid_img_link'))
            Cookie.dispose('_berta_grid_img_link');

        if(Cookie.read('_berta_grid_view'))
            Cookie.dispose('_berta_grid_view');

		//scroll fix (iphone viewport workaround)
        if(!navigator.userAgent.match(/OS 5_\d like Mac OS X/i) && /iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) {
            window.addEvent('resize',this.stickToBottom.bindWithEvent(this));
            window.addEvent('scroll',this.stickToBottom.bindWithEvent(this));
        }

		var messyItems = $$('.mess');
		
		if(bertaGlobalOptions.environment == 'engine') {
			messyItems.each(function(el) {
				if(!el.hasClass('xEntry')) el.adopt(new Element('div', { 'class': 'xHandle' }));
			});
			$$('.xEntryMove').addClass('xHandle');
			$$('.xEntryToBack').addEvent('click', this.editor_saveOrder.bindWithEvent(this));

			$$('.xEditableDragXY').addEvents({
				mouseenter: function(){
					$('xTopPanelContainer').hide();
					if($('xBgEditorPanelTrigContainer')) $('xBgEditorPanelTrigContainer').hide();
				},
				mouseleave: function(){
					$('xTopPanelContainer').show();
					if($('xBgEditorPanelTrigContainer')) $('xBgEditorPanelTrigContainer').show();
				}
			});
		}


        // Centering guides
        var container = $('contentContainer');
        var centeredLayout = container.hasClass('xCentered') ? true : false;
        
        if(centeredLayout) {
            document.body.setStyle('overflow-y', 'scroll');

            var guidesColor = container.getClassStoredValue('xCenteringGuides') == 'dark' ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.3)';
            var w = (window.getSize().x - container.getSize().x) / 2;
            var el1 = new Element('div', {
                'styles': {
                    'background-color': guidesColor,
                    'position': 'fixed',
                    'left': 0,  
                    'height': '100%',
                    'width': w + 'px'
                }
            });
            var el2 = new Element('div', {
                'styles': {
                    'background-color': guidesColor,
                    'position': 'fixed',
                    'right': 0,
                    'height': '100%',
                    'width': w + 'px'
                }
            });
            el1.inject(document.body, 'top');
            el2.inject(document.body, 'top'); 

            window.addEvent('resize', function() {
                var w1 = (window.getSize().x - container.getSize().x) / 2;
                el1.setStyle('width', w + 'px');
                el2.setStyle('width', w + 'px');
            });
        }
	}
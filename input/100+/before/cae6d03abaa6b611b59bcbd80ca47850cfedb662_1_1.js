function() {
		this.edittingMode = $$('body')[0].get('x_mode');
		this.initNewsTicker();
		this.sectionsEditorInit();
		
		if($('xNewsTickerContainer')) $('xNewsTickerContainer').hide();

		// Create section tip
		if(!Cookie.read('_berta_tips') && this.sectionsMenu.getChildren().length == 0) {
			
			var createSection_tip_anchor = document.getElementById('xCreateNewSection');
		    		
		    var createSectionTip = new Tips(createSection_tip_anchor, {
		        fixed: true,
		        className: 'xTipCreateSection',
		        offset: {'x': 460, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		    createSection_tip_anchor.store('tip:title', this.options.i18n.createSectionTip_title);
		    createSection_tip_anchor.store('tip:text', this.options.i18n.createSectionTip_text);
		        
		    createSection_tip_anchor.fireEvent('mouseenter');
		}
		
		//Go to my site tip
		if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'create_entry') {
			var goToMySite_tip_anchor = document.getElementById('xMySite');
		    		
		    var goToMySiteTip = new Tips(goToMySite_tip_anchor, {
		        fixed: true,
		        className: 'xTipGoToMySite',
		        offset: {'x': 4, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		    goToMySite_tip_anchor.store('tip:title', this.options.i18n.goToMySiteTip_title);
		    goToMySite_tip_anchor.store('tip:text', this.options.i18n.goToMySiteTip_text);
		        
		    goToMySite_tip_anchor.fireEvent('mouseenter');
		}
		
		// Template design tip
		if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'template_design') {    
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
		    	Cookie.write('_berta_tips', 'settings', {duration: 365, path: '/', path: '/'});
		    });
		}

		// Settings tip
		if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'settings') {
		    var settings_tip_anchor = document.getElementById('xSettings');
		    
		    var settingsTip = new Tips(settings_tip_anchor, {
		        fixed: true,
		        className: 'xTipSettings',
		        offset: {'x': 20, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		  	settings_tip_anchor.store('tip:title', this.options.i18n.settingsTip_title);
		   	settings_tip_anchor.store('tip:text', this.options.i18n.settingsTip_text);
		        
		    settings_tip_anchor.fireEvent('mouseenter');
		    
		    settings_tip_anchor.addEvent('click', function() {
				Cookie.write('_berta_tips', 'hidden', {duration: 365, path: '/'});
			});
		}
		
		// Create shop section tip
		if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
		   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' && 
		   (!Cookie.read('_berta_shop_tips') || Cookie.read('_berta_shop_tips') == 'create_shop_cart')) {
		    var createShopSection_tip_anchor = document.getElementById('xCreateNewSection');
		    
		    var createShopSectionsTip = new Tips(createShopSection_tip_anchor, {
		    	fixed: true,
		        className: 'xCreateShopSectionTip',
		        offset: {'x': 460, 'y': 20},
				showDelay: 0,
		        onHide: function(tip, el) {
		        	tip.show();
		        },
				onShow: function(tip, el) {
					if($('xRemoveTips')) $('xRemoveTips').addEvent('click', function(event) {
						event.stop();
						
						if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
							// Destroys and disposes of newEntryContentTip & sets cookie
							$$('.xCreateShopSectionTip').destroy(); $$('.xCreateShopSectionTip').dispose();
							Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
						}
					});
				}
		    });
		    
		    if (Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'create_shop_cart') {
		    	createShopSection_tip_anchor.store('tip:title', this.options.i18n.createShopCartSectionTip_title);
		    	createShopSection_tip_anchor.store('tip:text', this.options.i18n.createShopCartSectionTip_text);
		    } else {
		    	createShopSection_tip_anchor.store('tip:title', this.options.i18n.createShopSectionTip_title);
		    	createShopSection_tip_anchor.store('tip:text', this.options.i18n.createShopSectionTip_text);

		    }
		       
		    createShopSection_tip_anchor.fireEvent('mouseenter');
		}
		
		
		// Go to shop settings tip
		if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' && 
		   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
		   Cookie.read('_berta_shop_tips') && (Cookie.read('_berta_shop_tips') == 'goto_shop_settings' || Cookie.read('_berta_shop_tips') == 'shop_settings') ) {

		    var goToShopSettings_tip_anchor = document.getElementById('xSettings');
		        	
		    var goToShopSettingsTip = new Tips(goToShopSettings_tip_anchor, {
		        fixed: true,
		        className: 'xTipGoToShopSettings',
		        offset: {'x': 4, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		    goToShopSettings_tip_anchor.store('tip:title', this.options.i18n.goToShopSettingsTip_title);
		    goToShopSettings_tip_anchor.store('tip:text', this.options.i18n.goToShopSettingsTip_text);
		        
		    goToShopSettings_tip_anchor.fireEvent('mouseenter');
		    
		    goToShopSettings_tip_anchor.addEvent('click', function() {
		    	Cookie.write('_berta_shop_tips', 'shop_settings', {duration: 365, path: '/'});
		    });
		}
		
		// Create shop entry
		if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' && 
		   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
		   Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'create_shop_entry') {
		    Cookie.write('_berta_shop_tips', 'create_shop_entry' ,{duration: 365, path: '/'});
		    
		    // Go to my site tip
		    var goToMySite_tip_anchor = document.getElementById('xMySite');
		        	
		    var goToMySiteTip = new Tips(goToMySite_tip_anchor, {
		        fixed: true,
		        className: 'xTipGoToMySite',
		        offset: {'x': 4, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		    goToMySite_tip_anchor.store('tip:title', this.options.i18n.goToMySiteShopTip_title);
		    goToMySite_tip_anchor.store('tip:text', this.options.i18n.goToMySiteShopTip_text);
		        
		    goToMySite_tip_anchor.fireEvent('mouseenter');
		}
		
		// Go to shopping cart tip
		if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
		   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
		   Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'goto_shopping_cart') {
		    
		    var goToShoppingCart_tip_anchor = document.getElementById('xMySite');
		        
		    var templateDesignTip = new Tips(goToShoppingCart_tip_anchor, {
		        fixed: true,
		        className: 'xTipGoToShoppingCart',
		        offset: {'x': 4, 'y': 20},
		        onHide: function(tip, el) {
		        	tip.show();
		        }
		    });
		    
		    goToShoppingCart_tip_anchor.store('tip:title', this.options.i18n.goToShoppingCartTip_title);
		    goToShoppingCart_tip_anchor.store('tip:text', this.options.i18n.goToShoppingCartTip_text);
		        
		    goToShoppingCart_tip_anchor.fireEvent('mouseenter');
		}
		
	}
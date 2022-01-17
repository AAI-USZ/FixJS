function(resp) { 
				if(!resp) {
					alert('Berta says:\n\nServer produced an error while adding new section! Something went sooooo wrong...');
				} else if(resp && !resp.error_message) {
					var li = new Element('li', { 'class': 'xSection-'+resp.real, 'html': resp.update }).inject(this.sectionsMenu);
					this.sectionsSortables.addItems(li);
					this.editablesInit();
					li.getElement('a.xSectionDelete').addEvent('click', this.sectionOnDeleteClick.bindWithEvent(this));
					
					if(!Cookie.read('_berta_tips')) { 
						$$('.xTipCreateSection').destroy(); $$('.xTipCreateSection').dispose();
					
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
						
						goToMySite_tip_anchor.store('tip:title', this.options.i18n.goToMySiteTip_title);
						goToMySite_tip_anchor.store('tip:text', this.options.i18n.goToMySiteTip_text);
						    
						goToMySite_tip_anchor.fireEvent('mouseenter');
						
						Cookie.write('_berta_tips', 'create_entry', {duration: 365, path: '/'});
					}
					
		    		// Create shoping cart section tip
					if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' && Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' && !Cookie.read('_berta_shop_tips')) {
		    	
					    var createShopSection_tip_anchor = document.getElementById('xCreateNewSection');

					    createShopSection_tip_anchor.store('tip:title', this.options.i18n.createShopCartSectionTip_title);
					    createShopSection_tip_anchor.store('tip:text', this.options.i18n.createShopCartSectionTip_text);
					        
					    createShopSection_tip_anchor.fireEvent('mouseenter');
					    
		    			Cookie.write('_berta_shop_tips', 'create_shop_cart', {duration: 365, path: '/'});
					} else 
					if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' && Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'create_shop_cart') {
						$$('.xCreateShopSectionTip').destroy(); $$('.xCreateShopSectionTip').dispose();
						Cookie.write('_berta_shop_tips', 'goto_shop_settings' ,{duration: 365, path: '/'});
						
						// Go to shop settings tip
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
				} else {
					alert(resp.error_message);
				}
				this.sectionsEditor.removeClass('xSaving');
			}
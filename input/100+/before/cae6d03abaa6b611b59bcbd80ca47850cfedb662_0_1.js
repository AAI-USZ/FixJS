function() {

		this.edittingMode = $$('body')[0].get('x_mode');
		if(!this.edittingMode) this.edittingMode = 'entries';
		
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

				// New section tip
				if(!Cookie.read('_berta_tips')) {
				    var newSection_tip_anchor = document.getElementById('xSections');
			
				    var newSectionTip = new Tips(newSection_tip_anchor, {
				    	fixed: true,
				    	className: 'xTipNewSection',
				    	showDelay: 0,
				    	offset: {'x': 8, 'y': 20},
				    	onHide: function(tip, el) {
				    		tip.show();
				    	},
				    	onShow: function(tip, el) {
				    		document.getElementById('xRemoveTips').addEvent('click', function(event) {
				    			event.stop();
				    		
				    			if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
				    				// Destroys and disposes of newEntryContentTip & sets cookie
				    				$$('.xTipNewSection').destroy(); $$('.xTipNewSection').dispose();
				    				Cookie.write('_berta_tips', 'hidden', {duration: 365, path: '/'});
									window.location.reload();
				    			}
				    		});
				    	}
				    });
				    
				    newSection_tip_anchor.store('tip:title', this.options.i18n.newSectionTip_title);
				    newSection_tip_anchor.store('tip:text', this.options.i18n.newSectionTip_text);
				    	
				    newSection_tip_anchor.fireEvent('mouseenter');
				}

				//Go to my site tip
				if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'create_entry') {
					var goToMySiteCookie_tip_anchor = document.getElementById('xMySite');
				    		
				    var goToMySiteTip = new Tips(goToMySiteCookie_tip_anchor, {
				        fixed: true,
				        className: 'xTipGoToMySite',
				        offset: {'x': 4, 'y': 20},
				        onHide: function(tip, el) {
				        	tip.show();
				        }
				    });
				    
				    goToMySiteCookie_tip_anchor.store('tip:title', this.options.i18n.goToMySiteTip_title);
				    goToMySiteCookie_tip_anchor.store('tip:text', this.options.i18n.goToMySiteTip_text);
				        
				    goToMySiteCookie_tip_anchor.fireEvent('mouseenter');
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
				    	Cookie.write('_berta_tips', 'settings', {duration: 365, path: '/'});
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
				
				// Shop sections tip
				if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
				   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
				   (!Cookie.read('_berta_shop_tips') || Cookie.read('_berta_shop_tips') == 'create_shop_cart')) {
				    var shopSections_tip_anchor = document.getElementById('xSections');
				    
				    var shopSectionsTip = new Tips(shopSections_tip_anchor, {
				    	fixed: true,
				        className: 'xTipShopSections',
				        offset: {'x': 8, 'y': 20},
				        onHide: function(tip, el) {
				        	tip.show();
				        },
				        onShow: function(tip, el) {
				    		document.getElementById('xRemoveTips').addEvent('click', function(event) {
				    			event.stop();
				    		
				    			if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
				    				// Destroys and disposes of newEntryContentTip & sets cookie
				    				$$('.xTipShopSections').destroy(); $$('.xTipShopSections').dispose();
				    				Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
				    			}
				    		});
				    	}
				    });
				    
				    shopSections_tip_anchor.store('tip:title', this.options.i18n.shopSectionsTip_title);
				    shopSections_tip_anchor.store('tip:text', this.options.i18n.shopSectionsTip_text);
				        
				    shopSections_tip_anchor.fireEvent('mouseenter');
				}
				
				// Go to shop settings tip
				if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
				   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
				   Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'shop_settings') {
				
				    var shopSettings_tip_anchor = document.getElementById('shopSettings');
				        	
				    var shopSettingsTip = new Tips(shopSettings_tip_anchor, {
				        fixed: true,
				        className: 'xTipShopSettings',
				        offset: {'x': 4, 'y': 30},
				        onHide: function(tip, el) {
				        	tip.show();
				        }
				    });
				    
				    shopSettings_tip_anchor.store('tip:title', this.options.i18n.shopSettingsTip_title);
				    shopSettings_tip_anchor.store('tip:text', this.options.i18n.shopSettingsTip_text);
				        
				    shopSettings_tip_anchor.fireEvent('mouseenter');
				    
				    shopSettings_tip_anchor.addEvent('click', function() {
				    	$$('.xTipShopSettings').destroy(); $$('.xTipShopSettings').dispose();
				    	Cookie.write('_berta_shop_tips', 'create_shop_entry', {duration: 365, path: '/'});
				    	
						var createShopEntry_tip_anchor = document.getElementById('xMySite');
						    	
						var createShopEntryTip = new Tips(createShopEntry_tip_anchor, {
						    fixed: true,
						    className: 'xTipCreateShopEntry',
						    offset: {'x': 4, 'y': 20},
						    onHide: function(tip, el) {
						    	tip.show();
						    }
						});

						createShopEntry_tip_anchor.store('tip:title', this.options.i18n.goToMySiteShopTip_title);
						createShopEntry_tip_anchor.store('tip:text', this.options.i18n.goToMySiteShopTip_text);
						    
						createShopEntry_tip_anchor.fireEvent('mouseenter');
				    }.bind(this));
				}
				
				// Create shop entry
				if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' && 
				   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
				   Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'create_shop_entry') {
				    
				    var createShopEntry_tip_anchor = document.getElementById('xMySite');
				        	
				    var createShopEntryTip = new Tips(createShopEntry_tip_anchor, {
				        fixed: true,
				        className: 'xTipCreateShopEntry',
				        offset: {'x': 4, 'y': 20},
				        onHide: function(tip, el) {
				        	tip.show();
				        }
				    });
				    
				    createShopEntry_tip_anchor.store('tip:title', this.options.i18n.goToMySiteShopTip_title);
				    createShopEntry_tip_anchor.store('tip:text', this.options.i18n.goToMySiteShopTip_text);
				        
				    createShopEntry_tip_anchor.fireEvent('mouseenter');
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
				
				
				break;
			
			case 'entries':
			default:
				
				this.container = document.getElementById('contentContainer');
				this.entriesList = $$('.xEntriesList')[0];
				
				// section background editing
				if($('xBgEditorPanelTrig')) $('xBgEditorPanelTrig').addEvent('click', this.onBgEditClick.bindWithEvent(this));
				
				if($('xNewsTickerContainer') && (Cookie.read('_berta_tips') != 'hidden' || (this.options.shopEnabled && Cookie.read('_berta_shop_tips') != 'hidden'))) this.hideNewsTicker();

				if(this.entriesList) {
				
					this.currentSection = this.entriesList.getClassStoredValue('xSection');
					this.currentTag = this.entriesList.getClassStoredValue('xTag');
					
					if(this.currentSection) {
						this.entriesList.getElements('.xEntry .xEntryEditWrap').addEvent('mouseenter', this.entryOnHover.bindWithEvent(this));
						this.entriesList.getElements('.xEntry .xEntryEditWrap').addEvent('mouseleave', this.entryOnUnHover.bindWithEvent(this));
				
						this.entriesList.getElements('.xEntry .xEntryDropdown').addEvent('mouseenter', this.entryDropdownToggle.bindWithEvent(this));
						this.entriesList.getElements('.xEntry .xEntryDropdown').addEvent('click', this.entryDropdownToggle.bindWithEvent(this));
												
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
						
						// Hide tips if site has sections & no cookie, or template has been changed
						if(!Cookie.read('_berta_tips') || 
						   (Cookie.read('_berta_tips') != 'hidden' && this.options.templateName.substr(0,5) != 'messy')) {
							Cookie.write('_berta_tips', 'hidden', {duration: 365, path: '/'});
						}

						// New entry tip
						if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'create_entry') {							
							var newEntry_tip_anchor = this.container.getElement('a.xCreateNewEntry');
							
							var newEntryTip = new Tips(newEntry_tip_anchor, {
								fixed: true,
								className: 'xTipNewEntry',
								offset: {'x': 80, 'y': 28},
								onHide: function(tip, el) {
									tip.show();
								}
							});
							
							newEntry_tip_anchor.store('tip:title', this.options.i18n.newEntryTip_title);
							newEntry_tip_anchor.store('tip:text', this.options.i18n.newEntryTip_text);
							
							newEntry_tip_anchor.fireEvent('mouseenter');
							
							newEntry_tip_anchor.addEvent('click', function() {
								Cookie.write('_berta_tips', 'entry_content', {duration: 365, path: '/'});
							});
						}
				
						// New entry content tip
						if(Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'entry_content'  &&
				           this.container.getElements('.xEntry .xEntryEditWrap .xGalleryHasImages').length == 0) {
							
							var newEntryContent_tip_anchor = this.entriesList.getElements('.xEntry');
							
							var newEntryContentTip = new Tips(newEntryContent_tip_anchor, {
								fixed: true,
								className: 'xTipNewEntryContent',
								offset: {'x': 20, 'y': 42},
								onHide: function(tip, el) {
									tip.show();
								}
							});
							
							newEntryContent_tip_anchor.store('tip:title', this.options.i18n.newEntryContentTip_title);
							newEntryContent_tip_anchor.store('tip:text', this.options.i18n.newEntryContentTip_text);
								
							newEntryContent_tip_anchor.fireEvent('mouseenter');
							// Fixes 'create new entry' button's & top panel display problems
							document.getElementById('xTopPanelContainer').setStyle('display', 'block');
							this.container.getChildren('a.xCreateNewEntry')[0].setStyle('display', 'block'); 
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
								Cookie.write('_berta_tips', 'settings', {duration: 365, path: '/'});
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
												
						// Shop sections tip
						if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
						   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
						   (!Cookie.read('_berta_shop_tips') || Cookie.read('_berta_shop_tips') == 'create_shop_cart')) {
							var shopSections_tip_anchor = document.getElementById('xSections');
							
							var shopSectionsTip = new Tips(shopSections_tip_anchor, {
								fixed: true,
							    className: 'xTipShopSections',
							    offset: {'x': 8, 'y': 20},
							    onHide: function(tip, el) {
							    	tip.show();
							    },
						        onShow: function(tip, el) {
						    		document.getElementById('xRemoveTips').addEvent('click', function(event) {
						    			event.stop();
						    		
						    			if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
						    				// Destroys and disposes of newEntryContentTip & sets cookie
						    				$$('.xTipShopSections').destroy(); $$('.xTipShopSections').dispose();
						    				Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
						    			}
						    		});
						    	}
							});
							
							shopSections_tip_anchor.store('tip:title', this.options.i18n.shopSectionsTip_title);
							shopSections_tip_anchor.store('tip:text', this.options.i18n.shopSectionsTip_text);
							    
							shopSections_tip_anchor.fireEvent('mouseenter');
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
						    						    
						    if(this.options.sectionType == 'shop') {	
						    	if(this.galleries.length == 0) {				    
						    		var createShopEntry_tip_anchor = this.container.getElement('a.xCreateNewEntry');
						    		
						    		var createShopEntryTip = new Tips(createShopEntry_tip_anchor, {
						    		    fixed: true,
						    		    className: 'xTipCreateShopEntry',
						    		    offset: {'x': 80, 'y': 28},
						    		    onHide: function(tip, el) {
						    		    	tip.show();
						    		    }
						    		});
						    		
						    		createShopEntry_tip_anchor.store('tip:title', this.options.i18n.createShopEntryTip_title);
						    		createShopEntry_tip_anchor.store('tip:text', this.options.i18n.createShopEntryTip_text);
						    		createShopEntry_tip_anchor.addEvent('click', function() {
						    			Cookie.write('_berta_shop_tips', 'goto_shopping_cart', {duration: 365, path: '/'});
						    		});
						    	} else {
						    		// Go to shopping cart tip
						    		Cookie.write('_berta_shop_tips', 'goto_shopping_cart', {duration: 365, path: '/'});
									var createShopEntry_tip_anchor = document.getElementById('xShoppingCart');
									    
									var templateDesignTip = new Tips(createShopEntry_tip_anchor, {
									    fixed: true,
									    className: 'xTipGoToShoppingCartMySite',
									    offset: {'x': -28, 'y': 20},
									    onHide: function(tip, el) {
									    	tip.show();
									    }
									});
									
									createShopEntry_tip_anchor.store('tip:title', this.options.i18n.goToShoppingCartTip_title);
									createShopEntry_tip_anchor.store('tip:text', this.options.i18n.goToShoppingCartTip_text);
									
									createShopEntry_tip_anchor.addEvent('click', function() {
									    Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
									});
									    
									createShopEntry_tip_anchor.fireEvent('mouseenter');
						    	}
						    } else {
						    	var createShopEntry_tip_anchor = document.getElementById('xMySite');
						    	
						    	var createShopEntryTip = new Tips(createShopEntry_tip_anchor, {
						        	fixed: true,
						        	className: 'xTipCreateShopEntry',
						        	offset: {'x': 4, 'y': 20},
						        	onHide: function(tip, el) {
						        		tip.show();
						        	}
						    	});
						    	
						    	createShopEntry_tip_anchor.store('tip:title', this.options.i18n.goToMySiteShopTip_title);
						    	createShopEntry_tip_anchor.store('tip:text', this.options.i18n.goToMySiteShopTip_text);						    
						    }						    						        
						    
						    createShopEntry_tip_anchor.fireEvent('mouseenter');
						}
						
						// Go to shopping cart tip
						if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy' &&
						   Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' &&
						   Cookie.read('_berta_shop_tips') && Cookie.read('_berta_shop_tips') == 'goto_shopping_cart') {
							
							var goToShoppingCart_tip_anchor = document.getElementById('xShoppingCart');
							    
							var templateDesignTip = new Tips(goToShoppingCart_tip_anchor, {
							    fixed: true,
							    className: 'xTipGoToShoppingCartMySite',
							    offset: {'x': -28, 'y': 20},
							    onHide: function(tip, el) {
							    	tip.show();
							    }
							});
							
							goToShoppingCart_tip_anchor.store('tip:title', this.options.i18n.goToShoppingCartTip_title);
							goToShoppingCart_tip_anchor.store('tip:text', this.options.i18n.goToShoppingCartTip_text);
							
							goToShoppingCart_tip_anchor.addEvent('click', function() {
							    Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
							});
							    
							goToShoppingCart_tip_anchor.fireEvent('mouseenter');
						}
				
				
					} else if(!this.currentSection && !Cookie.read('_berta_tips')) {
						// New section tip
						if(this.options.templateName.substr(0,5) != 'messy')
							Cookie.write('_berta_tips', 'hidden', {duration: 365, path: '/'});
						
						this.container.getElement('h1').hide();

						var newSection_tip_anchor = document.getElementById('xSections');
			
						var newSectionTip = new Tips(newSection_tip_anchor, {
							fixed: true,
							className: 'xTipNewSection',
							showDelay: 0,
							offset: {'x': 8, 'y': 20},
							onHide: function(tip, el) {
								tip.show();
							},
							onShow: function(tip, el) {
								document.getElementById('xRemoveTips').addEvent('click', function(event) {
									event.stop();
								
									if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
										// Destroys and disposes of newEntryContentTip & sets cookie
										$$('.xTipNewSection').destroy(); $$('.xTipNewSection').dispose();
										Cookie.write('_berta_tips', 'hidden', {duration: 365, path: '/'});
										window.location.reload();
									}
								});
							}
						});
						
						newSection_tip_anchor.store('tip:title', this.options.i18n.newSectionTip_title);
						newSection_tip_anchor.store('tip:text', this.options.i18n.newSectionTip_text);
							
						newSection_tip_anchor.fireEvent('mouseenter');
					
					
					} else if(!this.currentSection && Cookie.read('_berta_tips') && Cookie.read('_berta_tips') == 'hidden' && (!Cookie.read('_berta_shop_tips') || Cookie.read('_berta_shop_tips') == 'create_shop_cart')) {
						// Shop sections tip
						if(this.options.shopEnabled && this.options.templateName.substr(0,5) == 'messy') {
							this.container.getElement('h1').hide();

							var shopSections_tip_anchor = document.getElementById('xSections');
							
							var shopSectionsTip = new Tips(shopSections_tip_anchor, {
								fixed: true,
								className: 'xTipShopSections',
								offset: {'x': 8, 'y': 20},
								onHide: function(tip, el) {
									tip.show();
								},
								onShow: function(tip, el) {
									document.getElementById('xRemoveTips').addEvent('click', function(event) {
										event.stop();
									
										if(confirm("Berta asks:\n\nAre you sure you want to remove tips?\nYou will not be able to view them again.")) {
											// Destroys and disposes of newEntryContentTip & sets cookie
											$$('.xTipShopSections').destroy(); $$('.xTipShopSections').dispose();
											Cookie.write('_berta_shop_tips', 'hidden', {duration: 365, path: '/'});
										}
									});
								}
							});
							
							shopSections_tip_anchor.store('tip:title', this.options.i18n.shopSectionsTip_title);
							shopSections_tip_anchor.store('tip:text', this.options.i18n.shopSectionsTip_text);
								
							shopSections_tip_anchor.fireEvent('mouseenter');
						}
					}
				} else {
					this.editablesInit();
				}
				break;
		} 
		
		// init news ticker
		this.newsTickerContainer = $('xNewsTickerContainer');
		if(this.newsTickerContainer) {
			this.newsTickerContainer.getElement('a.close').addEvent('click', function(event) {
				event.stop();
				new Fx.Slide(this.newsTickerContainer, { duration: 800, transition: Fx.Transitions.Quint.easeInOut }).show().slideOut();
				this.newsTickerContainer.addClass('xNewsTickerHidden');
				Cookie.write('_berta_newsticker_hidden', 1);
			}.bind(this));
			
			this.hideNewsTicker.delay(7000);
		}
	}
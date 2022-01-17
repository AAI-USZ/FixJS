function() {

			// check for behaviour setting of the floating menu
		    if ( Aloha.settings.floatingmenu ) {
		    	if ( typeof Aloha.settings.floatingmenu.draggable ===
				         'boolean' ) {
		    		this.draggable = Aloha.settings.floatingmenu.draggable;
		    	}

				if ( typeof Aloha.settings.floatingmenu.behaviour ===
				         'string' ) {
					this.behaviour = Aloha.settings.floatingmenu.behaviour;
				}

				if ( typeof Aloha.settings.floatingmenu.topalignOffset !==
					    'undefined' ) {
					this.topalignOffset = parseInt(
						Aloha.settings.floatingmenu.topalignOffset, 10 );
				}

				if ( typeof Aloha.settings.floatingmenu.horizontalOffset !==
				         'undefined' ) {
					this.horizontalOffset = parseInt(
						Aloha.settings.floatingmenu.horizontalOffset , 10 );
				}

				if ( typeof Aloha.settings.floatingmenu.marginTop ===
				         'number' ) {
				    this.marginTop = parseInt(
						Aloha.settings.floatingmenu.marginTop , 10 );
				}

				if ( typeof Aloha.settings.floatingmenu.width !==
				         'undefined' ) {
					this.width = parseInt( Aloha.settings.floatingmenu.width,
						10 );
				}
		    }

			jQuery.storage = new jQuery.store();

			this.currentScope = 'Aloha.global';

			var that = this;

			this.window.unload(function () {
				// store fm position if the panel is pinned to be able to restore it next time
				if (that.pinned) {
					jQuery.storage.set('Aloha.FloatingMenu.pinned', 'true');
					jQuery.storage.set('Aloha.FloatingMenu.top', that.top);
					jQuery.storage.set('Aloha.FloatingMenu.left', that.left);
					if (Aloha.Log.isInfoEnabled()) {
						Aloha.Log.info(this, 'stored FloatingMenu pinned position {' + that.left
								+ ', ' + that.top + '}');
					}
				} else {
					// delete old localStorages
					jQuery.storage.del('Aloha.FloatingMenu.pinned');
					jQuery.storage.del('Aloha.FloatingMenu.top');
					jQuery.storage.del('Aloha.FloatingMenu.left');
				}
				if (that.userActivatedTab) {
					jQuery.storage.set('Aloha.FloatingMenu.activeTab', that.userActivatedTab);
				}
			}).resize(function () {
				if (that.behaviour === 'float') {
					if (that.pinned) {
						that.fixPinnedPosition();
						that.refreshShadow();
						that.extTabPanel.setPosition(that.left, that.top);
					} else {
						var target = that.calcFloatTarget(Aloha.Selection.getRangeObject());
						if (target) {
							that.floatTo(target);
						}
					}
				}
			});
			Aloha.bind('aloha-ready', function() {
				that.generateComponent();
				that.initialized = true;
			});
			
			if (typeof Aloha.settings.toolbar === 'object') {
				this.fromConfig = true;				
			}
		}
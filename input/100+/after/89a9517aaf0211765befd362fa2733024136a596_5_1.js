function(sidebar) {
			var pl = this;
			pl.sidebar = sidebar;
			sidebar.addPanel({
                    
                    id         : nsClass('sidebar-panel'),
                    title     : i18n.t('internal_hyperlink'),
                    content     : '',
                    expanded : true,
                    activeOn : 'h1, h2, h3, h4, h5, h6',
                    
                    onInit     : function () {
                        var that = this,
                            content = this.setContent('<label class="'+nsClass('label')+'" for="'+nsClass('input')+'">'+i18n.t('headerids.label.target')+'</label><input id="'+nsClass('input')+'" class="'+nsClass('input')+'" type="text" name="value"/> <button class="'+nsClass('reset-button')+'">'+i18n.t('headerids.button.reset')+'</button><button class="'+nsClass('set-button')+'">'+i18n.t('headerids.button.set')+'</button>').content;
                        
                        content.find(nsSel('set-button')).click(function () {
                            var content = that.content;
							jQuery(that.effective).attr('id',jQuery(nsSel('input')).val());
							jQuery(that.effective).addClass('aloha-customized');
                        });
						
						content.find(nsSel('reset-button')).click(function () {
                            var content = that.content;
                            pl.processH(that.effective);
							jQuery(that.effective).removeClass('aloha-customized');
							that.content.find(nsSel('input')).val(that.effective.attr('id'));
                        });
                    },
                    
                    onActivate: function (effective) {
						var that = this;
						that.effective = effective;
						that.content.find(nsSel('input')).val(effective.attr('id'));
                    }
                    
                });
			sidebar.show();
		}
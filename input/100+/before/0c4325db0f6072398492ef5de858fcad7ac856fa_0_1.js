function( direction ){
			var self = this;
			if (self.clickable) {
			
				if (typeof direction == 'number') {	self.currentTab = direction;}
				else {
					// "left" = -1; "right" = 1;
					self.currentTab += ( ~~( direction === 'right' ) || -1 );
					// If not continuous, slide back at the last or first panel
					if (!self.options.continuous){
						self.currentTab = (self.currentTab < 0) ? $(self.panelClass).length - 1 : (self.currentTab % $(self.panelClass).length);
					}
				}
				// This is so the height will match the current panel, ignoring the clones.
				// It also adjusts the count for the "currrent" class that's applied
				if (self.options.continuous) {
					self.panelHeightCount = self.currentTab + 1;
					if (self.currentTab === self.panelCount - 2){self.setTab = 0;}
					else if (self.currentTab === -1) {self.setTab = self.panelCount - 3;}
					else {self.setTab = self.currentTab;}
				}
				else{
					self.panelHeightCount = self.currentTab;
					self.setTab = self.currentTab;
				}
				// Add and remove current class.
				if (self.options.dynamicTabs){
					$($(self.sliderId).parent()).find('.tab' + (self.setTab + 1) + ' a:first')
					.addClass('current')
					.parent().siblings().children().removeClass('current');
				}
				// Update the dropdown menu when small.
				if (self.options.responsive) { $(self.sliderId + '-nav-select').val('tab' + (self.currentTab + 1)); }
				this.transition();
			}
		}
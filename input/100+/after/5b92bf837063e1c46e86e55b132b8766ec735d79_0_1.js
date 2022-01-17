function( direction ){
			var self = this;
			if (self.clickable) {
			
				if (typeof direction == 'number') {	self.currentTab = direction;	}
				else {
					// "left" = -1; "right" = 1;
					self.currentTab += ( ~~( direction === 'right' ) || -1 );
					// If not continuous, slide back at the last or first panel
					if (!self.options.continuous){
						self.currentTab = (self.currentTab < 0) ? this.panelCount - 1 : (self.currentTab % this.panelCount);
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
				$($(self.sliderId).parent()).find('.tab' + (self.setTab + 1) + ' a:first')
				.addClass('current')
				.parent().siblings().children().removeClass('current');
			
				this.transition();
			}
		}
function() {
				if (this.backBtn && (this.actionOverflowBtnWidth > 0) && (this.visibleButtons.length >= 5)) {
					return this.getTotalWidth() - this.backBtnWidth;
				}
				else if ((this.actionOverflowBtnWidth > 0) && ((this.visibleTabs.length + this.visibleButtons.length) >= 6)) {
					return this.getTotalWidth() - this.backBtnWidth;
				} else {
					return this.getTotalWidth() - this.backBtnWidth - this.actionOverflowBtnWidth;	
				}
			}
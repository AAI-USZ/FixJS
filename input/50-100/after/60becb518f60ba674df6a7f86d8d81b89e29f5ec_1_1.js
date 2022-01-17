function(){
			if (this.pview) {
				this.pview.hide();
				delete this.pview;
				return;
			}
			// make visible
			this.pview = new pview.PropertyBox();
			this.$el.parent().append(pview.render());
			this._update_pview_offset({top:this.$el.css("top"), left:parseInt(this.$el.css('left'))});
		}
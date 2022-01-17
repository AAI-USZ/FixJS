function(e) {
			filterbtn = this.closest('.fieldgroup').find('.ss-gridfield-button-filter');
			resetbtn = this.closest('.fieldgroup').find('.ss-gridfield-button-reset');

			if(e.keyCode == '13') {
				btns = this.closest('.filter-header').find('.ss-gridfield-button-filter');

				var filterState='show'; //filterstate should equal current state.				
				if(this.hasClass('ss-gridfield-button-close')||!(this.closest('.ss-gridfield').hasClass('showFilter'))){
					filterState='hidden';
				}
				
				this.getGridField().reload({data: [{name: btns.attr('name'), value: btns.val(), filter: filterState}]});
				return false;
			}else{
				filterbtn.addClass('hover-alike');
				resetbtn.addClass('hover-alike');
			}
		}
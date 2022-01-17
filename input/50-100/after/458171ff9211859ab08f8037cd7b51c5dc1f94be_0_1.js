function(e){
			var filterState='show'; //filterstate should equal current state.
			
			if(this.hasClass('ss-gridfield-button-close') || !(this.closest('.ss-gridfield').hasClass('showFilter'))){
				filterState='hidden';
			}

			this.getGridField().reload({data: [{name: this.attr('name'), value: this.val(), filter: filterState}]});
			e.preventDefault();
		}
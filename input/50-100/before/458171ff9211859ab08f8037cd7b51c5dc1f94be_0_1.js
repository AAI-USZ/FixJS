function(e){
			this.getGridField().reload({data: [{name: this.attr('name'), value: this.val()}]});
			e.preventDefault();
		}
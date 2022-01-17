function(searchRemote) {
		
		if(searchRemote) {
			this.sub('vehicle_list').store.load();
			
		} else {
			this.sub('vehicle_list').store.clearFilter(true);			
			var idValue = this.sub('id_filter').getValue();
			var nameValue = this.sub('reg_no_filter').getValue();
			
			if(idValue || nameValue) {
				this.sub('vehicle_list').store.filter([ {
					property : 'id',
					value : idValue
				}, {
					property : 'name',
					value : nameValue
				} ]);
			}			
		}		
	}
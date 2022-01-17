function(searchRemote) {
		
		if(searchRemote) {
			this.sub('driver_list').store.load();
			
		} else {
			this.sub('driver_list').store.clearFilter(true);			
			var idValue = this.sub('id_filter').getValue();
			var nameValue = this.sub('name_filter').getValue();
			
			if(idValue || nameValue) {
				this.sub('driver_list').store.filter([ {
					property : 'id',
					value : idValue
				}, {
					property : 'name',
					value : nameValue
				} ]);
			}			
		}		
	}
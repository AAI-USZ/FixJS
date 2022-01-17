function(ha_level)
	{
		this.ha_level = ha_level;

		this.store_jab.reload();

		delete this.store.lastParams;
		
		this.store.reload({
			params	: {
				start	: 0
			,	limit	: 50
			}
		});
	}
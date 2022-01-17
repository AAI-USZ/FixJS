function(context, data){

		if(!data || (typeof data == 'object' && Object.keys(data).length <= 0))
			return logger.notice("No data to send for " + context);

		this.gathered_data.push(data);
		hooks.trigger('data', context, data);

	}
function(result){
		array = result.split('\n');
		store = Ext.getStore('chartStore');
		columns = array[0];
		volume = [];
		time = [];
		data = [];


		for (i = 1; i < array.length; i++)
		{
			line_clmns = array[i].split(',');
			data.push({
				time : parseInt(line_clmns[0]),
				volume : parseInt(line_clmns[2]),
			});
		}
		console.log(data);
	 	store.setData(data);
	 	console.log(store);
	 	this.openChart();
	}
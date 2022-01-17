function handleWolfpacks(data, textStatus, postData) {
		$.each(data.wolfpacksList,
				function(i,pack){
			obj.addWolfpack(pack);
		});
	}
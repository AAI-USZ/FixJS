function handleWolfpacks(data, textStatus, postData) {
		$.each(data.wolfpacksList,
				function(i,pack){
			obj.addWolfpack(pack);
		});
		
		eWolf.trigger("select",["__pack__wall-readers"]);
	}
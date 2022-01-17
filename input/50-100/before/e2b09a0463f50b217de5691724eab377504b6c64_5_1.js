function initMealplannerPeopleRowContainer(type, contentParent){
		var container = contentParent.find('.people .addRowContainer');
		var data = contentParent.find('#rowsJSON').attr('value');
		var errors = contentParent.find('#errorJSON').attr('value');
		initMealplannerPeopleRowContainerDoIt(container, data, errors);
	}
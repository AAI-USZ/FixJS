function initMealplannerPeopleRowContainer(type, contentParent){
		if (typeof(contentParent) === 'undefined') return;
		var container = contentParent.find('.people .addRowContainer');
		var data = contentParent.find('#rowsJSON').attr('value');
		var errors = contentParent.find('#errorJSON').attr('value');
		initMealplannerPeopleRowContainerDoIt(container, data, errors);
	}
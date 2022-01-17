function(formId){
	
	if($('#city_chouse', formId).length == 0 && this.cityView == null){
		this.createFields(formId);
		this.bindEvents(formId);
		this.refreshCitiesView();
	}
	else {
		this.bindEvents(formId);
	}
	
	this.fillFormFields();
	
}
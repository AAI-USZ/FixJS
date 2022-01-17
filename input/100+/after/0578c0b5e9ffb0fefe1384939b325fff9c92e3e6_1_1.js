function (ndx,field){
	if(field.value != null && !isInteger(field.value)){
	 appendValidationMsg(formName,field.id, "Integer Input Required");
	 highlightFieldError(formName,field.id,true);
	 formValid =false;
	}
  }
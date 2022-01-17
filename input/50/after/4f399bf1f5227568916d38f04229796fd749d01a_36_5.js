function getFormCharacterFE(/*char*/ c, /*char[]*/formArr){
	for(var i = 0; i < BaseForm.length; i++){
		if(c == BaseForm[i]){
			return formArr[i];
		}
	}
	return c;
}
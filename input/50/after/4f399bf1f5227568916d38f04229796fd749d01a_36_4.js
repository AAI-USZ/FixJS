function getMedialFormCharacterFE(c){
	for(var i = 0; i < BaseForm.length; i++){
		if(c == BaseForm[i]){
			return MedialForm[i];
		}
	}
	return c;
}
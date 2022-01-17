function isStandAlonCharacter(c){
	for(var i = 0; i < StandAlonForm.length; i++){
		if(StandAlonForm[i] == c){
			return true;
		}
	}
	return false;
}
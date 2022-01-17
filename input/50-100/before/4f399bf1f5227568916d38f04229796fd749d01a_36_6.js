function getOrientation(/*Char*/ oc){
	if(oc == 'L'){
		return "LTR";
	}
	if(oc == 'R'){
		return "RTL";
	}
	if(oc == 'C'){
		return "CLR";
	}
	if(oc == 'D'){
		return "CRL";
	}
}
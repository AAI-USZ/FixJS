function isNextArabic(str06, index, step, nIEnd){
	while(((index) * step) < nIEnd && isArabicDiacritics(str06[index])){
		index += step;
	}
	if(((index) * step) < nIEnd && isArabicAlefbet(str06[index])){
		return true;
	}
	return false;
}
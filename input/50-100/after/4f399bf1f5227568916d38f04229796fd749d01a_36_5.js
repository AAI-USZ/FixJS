function isArabicAlefbet(c){
	for(var i = 0; i < ArabicAlefBetIntervalsBegine.length; i++){
		if(c >= ArabicAlefBetIntervalsBegine[i] && c <= ArabicAlefBetIntervalsEnd[i]){
			return true;
		}
	}
	return false;
}
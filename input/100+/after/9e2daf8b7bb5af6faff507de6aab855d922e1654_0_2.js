function updateHistory(lat, lng, town){

	if ((town != localStorage.recentName0) && 
		(town != localStorage.recentName1) && 
		(town != localStorage.recentName2)){
		localStorage.recentName2 = localStorage.recentName1;
		localStorage.recentLat2 = localStorage.recentLat1;
		localStorage.recentLng2 = localStorage.recentLng1;
		localStorage.recentName1 = localStorage.recentName0;
		localStorage.recentLat1 = localStorage.recentLat0;
		localStorage.recentLng1 = localStorage.recentLng0;
		localStorage.recentName0 = town;
		localStorage.recentLat0 = lat;
		localStorage.recentLng0 = lng;
		refreshHistory();
	}
}
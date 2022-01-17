function(e){
	e.stop();

	 	s = event.scale;
	 	
		if (s<=0.187) s = -3;
	 	if (s>0.187 && s<=0.375) s = -2;
	 	if (s>0.375 && s<=0.75) s = -1;
	 	if (s>0.75 && s<=1.5) s = 0;
	 	if (s>1.5 && s<=3) s = 1;
	 	if (s>3 && s<=6) s = 2;
	 	if (s>6) s = 3;
	 	
	 	
	 	
	 	if (this.previousS!=s) {
			var z = this.previouszoom + s;
			Mojo.Log.info("setzoom+: ", z);
			this.previousS = s;
			this.map.setZoom(z);
			
		};

}
function (RA, water) {
		if(!water){
			water = w.profile;
		}
		
		var ca2 = (3.5) * ((water.HCO * 0.819672131) - (water.Ca / 3.5) - (water.Mg / 7) - RA);
		return Math.min(w.ions.Ca.max, ca2);
		//return ca2;
	}
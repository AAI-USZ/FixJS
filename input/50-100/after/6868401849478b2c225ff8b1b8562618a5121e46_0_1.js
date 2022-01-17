function (RA, water) {
		if(!water){
			water = w.profile;
		}
		
		var ca2 = 1.40056 * ((water.HCO * 0.819672131) - (0.714 * water.Ca) - (0.585 * water.Mg) - RA);
		return Math.min(w.ions.Ca.max, ca2);
		//return ca2;
	}
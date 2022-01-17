function (water) {
		if(!water){
			water = w.profile;
		}
		return (water.HCO * 0.819672131) - (water.Ca / 3.5) - (water.Mg / 7);
	}
function (HCO) {
		if(!water){
			water = w.profile;
		}
		return (water.HCO * 0.819672131) - (0.714 * water.Ca) - (0.585 * water.Mg);
	}
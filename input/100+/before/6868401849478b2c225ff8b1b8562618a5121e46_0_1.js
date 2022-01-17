function (c, r, p) {

		if(!p){
			p = w.profile;
		}

		var c1 = p.Ca,
		s1 = p.SO,
		d1 = p.Cl,
		k1 = w.salts.CaSO.effect.Ca,
		k2 = w.salts.CaCl.effect.Ca,
		k3 = w.salts.CaSO.effect.SO,
		k4 = w.salts.CaCl.effect.Cl;

		var g1_top = c - c1 - ((r * k2 * s1) / k4) + ((k2 * d1) / k4);
		var g1_bot = k1 + ((r * k2 * k3) / k4);
		var g1 = g1_top / g1_bot;

		var g2 = (c - c1 - (k1 * g1)) / k2;

		if(g1 < 0){
			g1 = 0;
		}

		if(g2 < 0){
			g2 = 0;
		}

		return {
			CaSO: g1,
			CaCl: g2
		};

	}
function($, B) {
	'use strict';

	var w = B.water = {};

	w.profile = {
		Ca: 43,
		Mg: 12,
		SO: 6,
		Na: 3,
		Cl: 6,
		HCO: 174
		/* not sure need to convert from Hardness 156 and Alkalinity: 143*/
		/* NOTE: HCO3- = Alkalinity x 61 / 50 ::: HCO = Alkalinity * 1.22 */
	};

	/* ions concentration  at 1 gram/gallon, units in ppm */
	w.salts = {
		CaSO: {
			name: 'Gypsum',
			effect: {
				Ca: 61.5,
				SO: 147.4
			}
		},
		CaCl: {
			name: 'Calcium Chloride',
			effect: {
				Ca: 72,
				Cl: 127
			}
		}
	};

	w.ions = {
		Ca: {
			max: 250
		},
		Cl: {
			max: 250
		},
		SO: {
			max: 250
		}
	};

	/* inputs in ppm */
	w.toRA = function (water) {
		if(!water){
			water = w.profile;
		}
		return (water.HCO * 0.819672131) - (water.Ca / 3.5) - (water.Mg / 7);
	};
	/*
	w.fromRA = function (RA, water) {
		return 3.5 * ((water.HCO * 0.819672131) - (0.585 * water.Mg) - RA);
	};
	*/

	w.raToPh = function (ra) {
		return 5.8 + 0.00168 * ra;
	};

	w.computeRaFromColor = function (srm) {
		var low, high;

		low = srm * 12.2 - 122.4;
		high = (srm - 5.2) * 12.2;

		return ( low + high ) / 2;
	};

	/* Ca required to lower RA */
	w.caRequired = function (RA, water) {
		if(!water){
			water = w.profile;
		}
		
		var ca2 = (3.5) * ((water.HCO * 0.819672131) - (water.Ca / 3.5) - (water.Mg / 7) - RA);
		return Math.min(w.ions.Ca.max, ca2);
		//return ca2;
	};

	/* ca in ppm, ratio in Cl/SO, returns grams for 1 gallon */
	/* c is Ca to be added, r is the Cl/SO ratio */
	w.caSaltsRequired = function (c, r, p) {

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

	};

	/* returns new profile */
	w.adjustWaterWithSalts = function (salts, water) {
		if(!water){
			water = w.profile;
		}
		var s, effect, saltDef, newWater = $.extend({}, water);
		for(s in salts){
			if(salts.hasOwnProperty(s)){
				saltDef = w.salts[s];
				if(!saltDef){
					continue;
				}
				for(effect in saltDef.effect){
					if(saltDef.effect.hasOwnProperty(effect)){
						newWater[effect] += saltDef.effect[effect] * salts[s];
					}
				}
			}
		}

		return newWater;
	};


}
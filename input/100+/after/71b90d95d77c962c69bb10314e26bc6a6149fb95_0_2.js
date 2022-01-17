function FMPresets() {
	Gibber.FMPresets = {
		glockenspiel : {
			cmRatio	: 3.5307,
			index 	: 1,
			attack	: 44,
			decay	: 44100,
		},
		//ljpfrog lp.f = FM(0.1, 2.0, 300, 5);
		//ljpradio lp.f = FM(1, 40.0, 300, 500); lp.f.amp = 0.2;
		//ljpnoise lp.f = FM(0.04, 1000.0, 1, 100);
		frog : {
			cmRatio	: 0.1,
			index	: 2.0,
			attack	: 300 * 44.1,
			decay	: 5 * 44.1,
		},
		gong : {
			cmRatio : 1.4,
			index	: .95,
			attack	: 44.1,
			decay	: 5000 * 44.1,
		},
		drum : {
			cmRatio : 1.40007,
			index	: 2,
			attack	: 44,
			decay	: 44100,
		},
		drum2 : {
			cmRatio: 1 + Math.sqrt(2),
			index: .2,
			attack: 44,
			decay: 20 * 44.1,
		},
		brass : {
			cmRatio : 1 / 1.0007,
			index	: 5,
			attack	: 4100,
			decay	: 4100,
		},
		clarinet : {
			cmRatio	: 3 / 2,
			index	: 1.5,
			attack	: 50 * 44.1,
			decay	: 200 * 44.1,
		}
	};
}
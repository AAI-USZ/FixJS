function () {
		var r = toRatio(maltBalanceSlider.slider( "option", "value" ));
		
		var srm = srmSlider.slider( "option", "value" );
		
		var w = B.water;

		
		var ra = w.computeRaFromColor(srm);
		var ca = w.caRequired(ra);

		console.log('r: ' + r + ' srm: ' + srm + ' Ca: ' + ca + ' RA: ' + ra);
		
		var salts = w.caSaltsRequired(ca, r);
		
		result.html('<div><b>CaSO</b>:' + salts.CaSO + '</div><div><b>CaCl</b>:' + salts.CaCl + '</div>');

	}
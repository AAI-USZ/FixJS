function () {
		var r = toRatio(maltBalanceSlider.slider( "option", "value" ));
		
		var srm = srmSlider.slider( "option", "value" );
		
		var w = B.water;

		
		var ra = w.computeRaFromColor(srm);
		var ca = w.caRequired(ra);

		var salts = w.caSaltsRequired(ca, r);

		var newWater = w.adjustWaterWithSalts(salts);
		var newRA = w.toRA(newWater);
		
		result.html('<div><b>CaSO</b>: ' + (salts.CaSO * volume.val()) + 'g</div>');
		result.append('<div><b>CaCl</b>: ' + (salts.CaCl * volume.val()) + 'g</div>');
		
		result.append('<BR><BR><div><b>RA</b>: ' + newRA + '</div>');
		result.append('<div><b>Chloride:Sulfate</b>: ' + r + '</div>');
		//result.append('<div><b>Est. Mash PH</b>: ' + w.raToPh(ra) + '</div>');

		if(newWater.Ca >= w.ions.Ca.max || (salts.CaSO + salts.CaCl) <= 0){
			result.css({
				color: 'red'
			});
		}else{
			result.css({
				color: 'black'
			});
		}

	}
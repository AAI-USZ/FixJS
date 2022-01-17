function () {
		var r = toRatio(maltBalanceSlider.slider( "option", "value" ));
		
		var srm = srmSlider.slider( "option", "value" );
		
		var w = B.water;

		/* why do I have to offset by 13?? */
		var ra = w.computeRaFromColor(srm);
		var ca = w.caRequired(ra);

		//console.log('Ca required');
		//console.log(ca);

		var salts = w.caSaltsRequired(ca, r);

		var newWater = w.adjustWaterWithSalts(salts);
		//console.log(w.profile);
		//console.log(newWater);
		var newRA = parseInt(w.toRA(newWater), 10);
		

		var CaSOgrams = salts.CaSO * volume.val();
		var CaSOtsp = CaSOgrams / w.salts.CaSO.tsp;
		

		var CaClgrams = salts.CaCl * volume.val();
		var CaCltsp = CaClgrams / w.salts.CaCl.tsp;


		result.html('<div><b>CaSO</b>: ' + B.util.round(CaSOgrams, 2) + 'g  &nbsp;&nbsp;&nbsp; ' + B.util.round(CaSOtsp, 1) + ' tsp</div>');
		result.append('<div><b>CaCl</b>: ' + B.util.round(CaClgrams, 2) + 'g &nbsp;&nbsp;&nbsp; ' + B.util.round(CaCltsp, 1) + ' tsp</div>');
		
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
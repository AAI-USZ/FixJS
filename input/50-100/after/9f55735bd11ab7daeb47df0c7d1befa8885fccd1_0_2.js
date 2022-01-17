function updateSrm() {
		var v = srmSlider.slider( "option", "value" );
		srmValue.html('SRM: ' + parseInt(v, 10));
		raValue.html(' RA: ' + parseInt(B.water.computeRaFromColor(v), 10));
		srmColor.css({
			background: B.units.convert('SRM', 'HTML_RGB', v)
		});
		compute();
	}
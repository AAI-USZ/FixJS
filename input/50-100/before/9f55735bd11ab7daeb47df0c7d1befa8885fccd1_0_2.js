function updateSrm() {
		var v = srmSlider.slider( "option", "value" );
		srmValue.html('SRM: ' + parseInt(v, 10));
		srmColor.css({
			background: B.units.convert('SRM', 'HTML_RGB', v)
		});
		compute();
	}
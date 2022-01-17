function($, B) {
	'use strict';

	var templates = {};
	$('script[type="text/x-jquery-tmpl"]').each(function () {
		var s = $(this);
		templates[s.attr('id')] = $.template(s);
	});

	$.widget('beer.waterProfileSelector', {
		
		options: {
			profiles: []
		},

		_create: function () {
			var self = this, e = this.element;
			
			e.html($.tmpl(templates.waterProfileForm));
		}

	});


	var compute;

	var calc, srmSlider, maltBalanceSlider;

	var srmColor, srmValue;

	calc = $('.simple-water-calculator');

	srmColor = calc.find('.srm-slider-info .srm-color');
	srmValue = calc.find('.srm-slider-info .srm-value');

	srmSlider = calc.find('.srm-slider').slider({
		value: 10,
		min: 2,
		max: 40,
		step: 0.1
	});

	srmSlider.on('slide', updateSrm);

	function updateSrm() {
		var v = srmSlider.slider( "option", "value" );
		srmValue.html('SRM: ' + parseInt(v, 10));
		srmColor.css({
			background: B.units.convert('SRM', 'HTML_RGB', v)
		});
		compute();
	}

	

	var toRatio, ratioValue, ratioDescription, toDescription;

	toRatio = function(rangeValue) {
		if (rangeValue > 0) {
			return rangeValue;
		} else if (rangeValue < 0) {
			return -Math.round(100 / rangeValue) / 100;
		} else {
			return 1;
		}
	};

	toDescription = function(ratio) {
		if (ratio > 2) {
			return 'very malty';
		} else if (ratio > 1.3) {
			return 'malty';
		} else if (ratio > 0.77) {
			return 'balanced';
		} else if (ratio > 0.5) {
			return 'bitter';
		} else {
			return 'very bitter';
		}
	};

	ratioValue = calc.find('.ratio-slider-info .value');
	ratioDescription = calc.find('.ratio-slider-info .description');

	//Chloride:Sulfate ratio
	maltBalanceSlider = calc.find('.malt-balance-slider').slider({
		min: -10,
		max: 10,
		step: 0.1
	});

	maltBalanceSlider.on('slide', updateBalance);

	function updateBalance()  {
		var v = maltBalanceSlider.slider( "option", "value" );
		var r = toRatio(v);
		ratioValue.html('Chloride:Sulfate: ' + r);
		ratioDescription.html(toDescription(r));
		compute();
	}


	var result = calc.find('.result');

	compute = function () {
		var r = toRatio(maltBalanceSlider.slider( "option", "value" ));
		
		var srm = srmSlider.slider( "option", "value" );
		
		var w = B.water;

		
		var ra = w.computeRaFromColor(srm);
		var ca = w.caRequired(ra);

		console.log('r: ' + r + ' srm: ' + srm + ' Ca: ' + ca + ' RA: ' + ra);
		
		var salts = w.caSaltsRequired(ca, r);
		
		result.html('<div><b>CaSO</b>:' + salts.CaSO + '</div><div><b>CaCl</b>:' + salts.CaCl + '</div>');

	};

	updateSrm();
	updateBalance();

}
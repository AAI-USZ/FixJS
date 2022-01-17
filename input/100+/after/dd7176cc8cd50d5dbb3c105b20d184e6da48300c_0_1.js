function (color) {
		$('#color').val(color);
		
		var changetoHSL = $.farbtastic('#colorpicker').hsl;
		var hue = changetoHSL[0];
		var compliment = 0;
		
		
		if (hue < .5) {
			compliment = hue + .5;
		}else{
			compliment = hue - .5;
		}
		
		var hsl = [
			Math.round(compliment * 360)
			, Math.round(changetoHSL[1] * 100)
			, Math.round(changetoHSL[2] * 100)
		]
				
		console.log('hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		$('#compliment').css('background-color', 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		
		var hexCom = [
			hsl[0] / 360
			,hsl[1] / 100
			,hsl[2] / 100
		
		]
		var trueHexa = hsl[0] 
		var trueHexb = hsl[1]
		var trueHexc = hsl[2]
		console.log(trueHexb);
		
		//$.farbtastic('#colorpicker')$.farbtastic('#complimentary',trueHex);
		
		var trueHex = $.colors( 'hsla(98,trueHexb + '%',trueHexc + '%',0.4)' ).toString('hex');
		$('#complimentary').val(trueHex);
		console.log(trueHex);
		console.log('hexCom(' + hexCom[0] + ', ' + hexCom[1] + ', ' + hexCom[2] + ')');
		//'hexCom(' + hexCom[0] + ', ' + hexCom[1] + ', ' + hexCom[2])');
		
		//var changetoComHEX = hsL.color;
		//console.log(changetoComHEX);
		//$('#complimentary').val(changetoComHEX);
		//var comcolorValue = 
		
		
		//Supplementary one
		if (hue < .5) {
			compliment = hue + .05;
		}else{
			compliment = hue - .05;
		}
		
		var hsl = [
			Math.round(compliment * 360)
			, Math.round(changetoHSL[1] * 100)
			, Math.round(changetoHSL[2] * 100)
		]
				
		console.log('hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		$('#suppliment1').css('background-color', 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		
		
		//Supplementary two
		if (hue < .5) {
			compliment = hue + -.05;
		}else{
			compliment = hue - -.05;
		}
		
		var hsl = [
			Math.round(compliment * 360)
			, Math.round(changetoHSL[1] * 100)
			, Math.round(changetoHSL[2] * 100)
		]
				
		console.log('hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		$('#suppliment2').css('background-color', 'hsl(' + hsl[0] + ', ' + hsl[1] + '%, ' + hsl[2] + '%)');
		
	}
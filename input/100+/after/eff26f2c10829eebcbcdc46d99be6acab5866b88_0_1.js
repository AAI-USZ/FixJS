function toggleControls(n){
		switch(n){
			case "on":
				$('buffForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "inline";
				break;
			case "off":
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				$('buffForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addBuff').style.display = "none";
				$('items').style.display = "none";
				break;
		};
	}
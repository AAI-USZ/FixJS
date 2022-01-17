function toggleControls(n){
		switch(n){
			case "on":
				$('honeyForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				$('listHeader').style.display = "inline";
				break;
			case "off":
				$('honeyForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				$('listHeader').style.display = "none";
				break;
			default:
				return false;
		}
	}
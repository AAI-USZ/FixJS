function toggle(b){
		switch(b){
			case "on":
				ElId('billForm').style.display = "none";
				ElId('clear').style.display = "inline";
				ElId('displayData').style.display = "none";
				ElId('addNew').style.display = "inline";
				break;
			case "off":
				ElId('billForm').style.display = "block";
				ElId('clear').style.display = "inline";
				ElId('displayData').style.display = "inline";
				ElId('addNew').style.display = "none";
				ElId('items').style.display = "none";
				break;
			default:
				return false;
		}
	}
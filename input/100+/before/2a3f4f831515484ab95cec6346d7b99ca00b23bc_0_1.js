function toggleControls(n) {
	switch(n) {
		case "on":
			a('choreForm').style.display = "none";
			a('clear').style.display = 'inline';
			a('displayButton').style.display = 'none';
			a('addNew').style.display = 'inline';
			break;
		case "off":
			a('choreForm').style.display = "block";
			a('clear').style.display = 'inline';
			a('displayButton').style.display = 'inline';
			a('addNew').style.display = 'none';
			a('items').style.display = 'none';
			break;
		default:
			return;
	}
    }
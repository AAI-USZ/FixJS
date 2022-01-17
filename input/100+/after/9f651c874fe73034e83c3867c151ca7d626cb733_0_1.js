function toggleControls(n) {
		switch(n) {
			case "on":
				a('choreForm').style.display = "none";
				a('displayButton').style.display = "none";
				break;
			case "off":
				a('choreForm').style.display = "block";
				a('items').style.display = 'none';
				break;
			default:
				return false;
}
}
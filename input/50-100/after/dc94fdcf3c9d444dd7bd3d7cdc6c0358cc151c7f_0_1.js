function init(x) {
	hunts = JSON.parse(x);
	$('username').innerHTML=hunts[0];
	multiple=hunts[2][0].content;
	hunts=hunts[1];
	for ( x = 0; x < hunts.length; x++)
		$('selecthunt').options[$('selecthunt').options.length] = new Option(hunts[x]['title'], x);
		
}
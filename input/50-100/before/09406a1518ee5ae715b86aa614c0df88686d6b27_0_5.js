function displayTabs( _index ) {
	var t = [];
	for( var i =0; i <numTabs; i++ ) {
		t[i] = $("#tabarea_" + i );
	}

	for( var i = 0; i < numTabs; i++ ) {
		if( i == _index ) {
			t[i].attr("style","display:block;");
		} else {
			t[i].attr("style","display:none;");
		}
	}
}
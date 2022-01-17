function create_and_write_data_to_cookie(devNames, newValue) {
	var pairData = read_cookie(pair_cookie_name);

	var cnt = pairData.length;
	var newCookieData = "";

	for( var i = 0; i < cnt; i++ ){
		var pairObj = pairData[ i ];
		var pairNames = pairObj.slice(0, -2);
		if( pairNames == devNames ){
			var newPairVal = pairObj.slice(0, -1) + newValue;
			pairData[i] = newPairVal;
            }
//        }
//    } else {
//        for (var i = 1; i < devNameList.length; i++) {
//            for (var j = 0; j < i; j++) {
//                var top_name = $("." + devNameList[j]);
//                var count_index = $("#top_row_names td").index($(top_name))

		newCookieData = (newCookieData != "") ? (newCookieData + pairData[ i ] + ",") : (pairData[ i ] + ",");
//            }
//        }
    }
	//remove the last comma and update the cookie data
	newCookieData = newCookieData.slice(0, -1);

	update_pair_cookie( newCookieData );

}

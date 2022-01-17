function setPeriod(el) {

	Element.extend(el);

	//alert(el.value);

	var dates = el.value.split("|");

	var from_date = dates[0].split(",");

	var to_date = dates[1].split(",");



	if (from_date[0] < 10) {

		$('"from_Month"').value  = "0" + from_date[0];

	} else {

		$('"from_Month"').value  = from_date[0];

	}

	$('"from_Day"').value    = from_date[1];

	$('from_Year').value = from_date[2];



	if (to_date[0] < 10) {

		$('"to_Month"').value  = "0" + to_date[0];

	} else {

		$('"to_Month"').value  = to_date[0];

	}

	$('"to_Day"').value    = to_date[1];

	$('to_Year').value = to_date[2];               	

}
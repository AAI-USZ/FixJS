function getSelectedRadio() {
		var radio = document.forms[0].genderValue;
		for (var i=0; i<radio.length; i++) {
			if (radio[i].checked) {
				genderValue = radio[i].value;
			};
		};
	}
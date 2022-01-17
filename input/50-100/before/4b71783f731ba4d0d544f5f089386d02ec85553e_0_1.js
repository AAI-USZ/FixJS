function getSelectedRadio() {
		var radio = document.forms[0].gender
		for (var i=0; i<radio.length; i++) {
			if (radios[i].checked) {
				genderValue = radios[i].value;
			};
		};
	}
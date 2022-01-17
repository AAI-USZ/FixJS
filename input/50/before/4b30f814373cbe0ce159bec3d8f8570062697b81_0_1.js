function (val, i) {
				$(sprintf(fieldstr, sprintf("%s[]", key), val)).appendTo(form);
			}
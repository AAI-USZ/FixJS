function (i, val) {
				$(sprintf(fieldstr, sprintf("%s[]", key), val)).appendTo(form);
			}
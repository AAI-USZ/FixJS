function (i, valueControl) {
		var row = $('<tr></tr>');

		if (i === 0) {
			row.append($('<td class="mainOption"></td>').append(that.mainOptionSelect));
		} else {
			row.append('<td></td>');
		}

		if (that.node.getAttr('disambiguate') === "true") {
			row.append($('<td></td>'));
		} else {
			row.append($('<td></td>').append(valueControl));

			if (i === that.valueControls.length - 1) {
				row.append($('<td></td>').append(that.subOptionControl));
			} else {
				row.append($('<td>' + valueSeparator + '</td>'));
			}		
			row.append('<td class="delete"><button class="deleteValue">-</button></td>');
			if (that.valueControls.length === 1) {
				row.find('button.deleteValue').css({visibility:"hidden"});
			}

			if (i === that.valueControls.length - 1) {
				row.append('<td class="add"><button class="addValue">+</button></td>');
			} else {
				row.append('<td class="add"></td>');
			}
		}
		table.append(row);
	}
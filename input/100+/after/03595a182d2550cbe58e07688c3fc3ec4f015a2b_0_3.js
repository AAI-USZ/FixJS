function (i, valueControl) {
		var row = $('<tr></tr>');

		row.append($('<td class="mainOption"></td>').append(that.mainOptionControls[i]));
		row.append($('<td></td>').append(valueControl));

		row.append($('<td></td>').append(that.subOptionControls[i]));
		if (i === that.valueControls.length - 1) {
			row.append($('<td/>'));
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

		table.append(row);
	}
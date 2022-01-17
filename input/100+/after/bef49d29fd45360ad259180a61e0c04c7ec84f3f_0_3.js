function addOptionInput(option, $wrapper) {
		var ni = ' name="' + option.name + '" id="' + option.name + '"';
		var nic = ni + ' class="option"';

		if (option.type == 'string') {
			var i = $('<input type="text"' + nic + ' />');
			i.val(slashAdd(option.defaultValue));
			anyUpdate(i, function () {
				var v = i.val();

				if (v.indexOf(' ') != -1) {
					v = v.replace(/ /g, "\xB7");
					i.val(v);
				}

				if (slashRemove(v).match(option.validation)) {
					$wrapper.removeClass('optionInvalid');
				} else {
					$wrapper.addClass('optionInvalid');
				}
			});
			i.change();
			return i;
		}

		if (option.type == 'checkbox') {
			var cb = $('<input type="checkbox"' + ni + ' />');

			if (option.defaultValue) {
				cb.prop('checked', true);
			}

			return $('<div class="option" />').append(cb);
		}

		if (option.type == 'list') {
			var l = $('<select' + nic + ' />');
			option.values.forEach(function (item) {
				l.append($('<option />').prop('value', item).text(item));
			});
			return l;
		}

		return $('<div />').text('Unknown option type: ' + option.type);
	}
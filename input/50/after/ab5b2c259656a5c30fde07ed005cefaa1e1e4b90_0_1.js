function (idx, elem) {
			var $elem = $(elem);
			var v = $elem.val();
			v = slashRemove(v);
			options[$elem.attr('id')] = v;
		}
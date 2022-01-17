function (idx, elem) {
			var $elem = $(elem);
			var v = $elem.val();
			v = stripslashes(v);
			options[$elem.attr('id')] = v;
		}
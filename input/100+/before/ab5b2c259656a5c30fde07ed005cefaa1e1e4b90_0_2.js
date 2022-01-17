function () {
		if (! dirty && ! force) {
			return;
		}

		dirty = false;
		var content = $cssIn.val();

		if (! force && content == lastContent) {
			return;
		}

		force = false;
		lastContent = content;
		options = {};
		$(".option").each(function (idx, elem) {
			var $elem = $(elem);
			var v = $elem.val();
			v = stripslashes(v);
			options[$elem.attr('id')] = v;
		});

		var pp = prettycss.parse(content, options);
		$cssOut.val(pp.toString());
		showCodeList('#errorList', pp.errors);
		showCodeList('#warningList', pp.warnings);

		var updateClasses = function (hasErrOrWarn, target, className) {
			var $t = $(target);

			if (hasErrOrWarn) {
				$t.removeClass('no_' + className);
				$t.addClass(className);
			} else {
				$t.addClass('no_' + className);
				$t.removeClass(className);
			}
		};

		updateClasses(pp.errors.length, '.update', 'error');
		updateClasses(pp.warnings.length, '.update', 'warning');
	}
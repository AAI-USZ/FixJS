function () {
	var lastContent = '';
	var prettycss = require('./prettycss');
	var $cssIn = $('#cssIn');
	var $cssOut = $('#cssOut');
	var dirty = false;
	var force = true;  // Force the initial call to set up the form
	var setFlag = function () {
		dirty = true;
	};
	var update = function () {
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
	};

	window.setInterval(update, 100);
	update();
	anyUpdate($cssIn, setFlag);
	addOptions();

	var setOptions = function (opt) {
		var $optElem = $('.option');

		for (var i in opt) {
			var v = opt[i];
			v = addslashes(v);
			$optElem.filter('#' + i).val(v);
		}
	};
	$('#presetMinify').click(function () {
		var opt = defaultOptions();

		for (var i in opt) {
			opt[i] = '';
		}

		opt.selector_whitespace = " ";
		opt.selector_comma = ",";
		opt.block_pre = "{";
		opt.block_post = "}";
		opt.atblock_pre = "{";
		opt.atblock_post = "}";
		opt.ruleset_post = "\n";
		opt.at_post = "\n";
		opt.important = "!important";
		opt.function_comma = ",";
		opt.propertiesLowerCase = true;
		opt.topcomment_post = "\n";
		opt.cssLevel = 3;
		opt.valuesLowerCase = true;
		setOptions(opt);
		force = true;
		return false;
	});
	$('#presetDefault').click(function () {
		setOptions(defaultOptions());
		force = true;
		return false;
	});
	$('#cssIn').focus();
	var $tabs = $('#tabs').tabs();
	$('.warningsAndErrors').live('click', function () {
		$tabs.tabs('select', 1);
	});
}
function (element) {
			var $element = jQuery(element);
			$element.addClass(WAI_LANG_CLASS);
			$element.attr('data-gentics-aloha-repository', 'wai-languages');
			$element.attr('data-gentics-aloha-object-id', $element.attr('lang'));
		}
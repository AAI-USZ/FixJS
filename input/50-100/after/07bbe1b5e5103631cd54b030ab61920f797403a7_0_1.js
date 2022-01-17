function () {

	'use strict';

	jQuery(document).ready(function () {

		jQuery('.page-profile ul.repo_filterer li a').each(function () {

			try {

				var elem = jQuery(this),

					selector = elem.attr('rel'),

					elements = jQuery('ul.repo_list').find('li.' + selector);

				elem.append(' (' + elements.size() + ')');

			} catch (e) {}

		});

	});

}
function () {
			var twipsyOptions = {
					placement: 'below',
					delayIn: 700
				},
				contactView = new Contact.Views.Contact({ el: '#contact' });

			$('ul.social-icons, a.icon').twipsy(twipsyOptions);
			$('nav a').twipsy($.extend({}, twipsyOptions, {offset: -20}));
		}
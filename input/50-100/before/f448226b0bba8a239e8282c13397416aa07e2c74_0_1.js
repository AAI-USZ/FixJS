function () {
			var twipsyOptions = {
					placement: 'below',
					delayIn: 700
				},
				contactView = new Contact.Views.Contact({ el: '#contact' });

			$('#cats').modal({ backdrop: true});
			$('ul.social-icons, a.icon').twipsy(twipsyOptions);
			$('nav a').twipsy($.extend({}, twipsyOptions, {offset: -20}));
		}
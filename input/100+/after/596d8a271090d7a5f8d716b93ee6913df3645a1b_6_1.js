function () {
			var waiLang = Aloha.require('wai-lang/wai-lang-plugin');
			var locale = Aloha.settings.locale;
			var iso = waiLang.iso639;

			if (locale !== 'de') {
				locale = 'en';
			}

			if (iso !== 'iso639-1') {
				iso = 'iso639-2';
			}

			this.flags = waiLang.flags;

			// Load the language codes
			jQuery.ajax({
				url      : Aloha.getPluginUrl('wai-lang') + '/lib/' + iso + '-' + locale + '.json',
				dataType : 'json',
				success  : jQuery.proxy(this.storeLanguageCodes, this),
				error    : this.errorHandler
			});

		    this.repositoryName = 'WaiLanguages';
		}
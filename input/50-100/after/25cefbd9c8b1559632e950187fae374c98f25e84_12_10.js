function (obj) {
			obj.find('span[lang]').each(function () {
				jQuery(this).removeClass(WAI_LANG_CLASS);
				jQuery(this).removeAttr("data-gentics-aloha-repository");
				jQuery(this).removeAttr("data-gentics-aloha-object-id");
				jQuery(this).attr("xml:lang", jQuery(this).attr("lang"));
			});
		}
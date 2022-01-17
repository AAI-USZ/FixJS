function(options) {
        var plugin = this;

        var defaults = {
            lang : i18n.getLang(),
            url : '/local/',
            showTranslations : false
        };

        var settings = $.extend(defaults, options);

        if( settings.showTranslations )
        {
            var translations = "{\n",
                elt;
            this.each(function() {
                var el = $(this);
                translations += '\t"'+el.html().replace(/\"/g,"\\\"")+'" : "",\n';
            });
            translations = translations.substr(0, translations.length-2);
            translations += "\n}";

            console.info(translations);
        }

        if( settings.lang !== undefined )
        {
            var i18nData = jQuery.data(document.body, 'i18n-' + settings.lang);
            // Check if translations are in cache
            if( i18nData === undefined )
            {
                $.ajax({
                    url : settings.url + settings.lang + '.json',
                    dataType : 'json',
                    async : false,
                    success : function(data){
                        i18n.init(data);
                        // Cache translations
                        jQuery.data(document.body, 'i18n-' + settings.lang, data);
                    }
                });
            }
            else
            {
                i18n.init(i18nData);
            }

            var el,
                key,
                translation;
            return this.each(function() {
                el = $(this);
                // Check if key for translation is in cache
                if( el.data("i18n-key") !== undefined )
                {
                    key = el.data("i18n-key");
                    translation = i18n.translate(key);
                }
                else
                {
                    key = el.html();
                    translation = i18n.translate(el.html());
                    // Cache key for translation
                    el.data("i18n-key", key);
                }
                el.html(translation);
            });
        }
    }
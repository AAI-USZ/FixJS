function (i, el) {
                // Extract fieldname and original language code from class attribute
                var css_lang_suffix = 'modeltranslation-field-';
                var name = '';
                var lang = '';
                $.each($(el).attr('class').split(' '), function(j, cls) {
                    if (cls.substring(0, css_lang_suffix.length) === css_lang_suffix) {
                        var v = cls.substring(css_lang_suffix.length,
                                              cls.length).split('__');
                        name = v[0];
                        lang = v[1];
                    }
                });
                if (!grouped_translations[name]) {
                    grouped_translations[name] = {};
                }
                grouped_translations[name][lang] = el;
            }
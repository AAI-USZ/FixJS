function (i, el) {
                /*
                // FIXME: Fails if there's an inline which has the same field name as
                //        the edited object.
                
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
                */
                var name = $(el).attr('name').split('_'),
                  lang = name.pop();
                name = name.join('_');
                if (!grouped_translations[name]) {
                    grouped_translations[name] = {};
                }
                grouped_translations[name][lang] = el;
            }
function (i, el) {
                var name = $(el).attr('name').split('_'),
                  lang = name.pop();
                name = name.join('_');
                if (!grouped_translations[name]) {
                    grouped_translations[name] = {};
                }
                grouped_translations[name][lang] = el;
            }
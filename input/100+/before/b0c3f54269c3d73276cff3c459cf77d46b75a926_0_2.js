function createTabs() {
            var grouped_translations = getGroupedTranslationFields();
            var tabs = [];
            $.each(grouped_translations, function (name, languages) {
                var tabs_container = $('<div></div>'),
                  tabs_list = $('<ul></ul>'),
                  insertion_point;
                tabs_container.append(tabs_list);
                $.each(languages, function (lang, el) {
                    var container = $(el).closest('.form-row'),
                      label = $('label', container),
                      field_label = container.find('label'),
                      id = 'tab_' + [name, lang].join('_'),
                      panel, tab;
                    // Remove language and brackets from field label, they are
                    // displayed in the tab already.
                    if (field_label.html()) {
                        field_label.html(field_label.html().replace(/\ \[.+\]/, ''));
                    }
                    if (!insertion_point) {
                        insertion_point = {
                            'insert': container.prev().length ? 'after' : container.next().length ? 'prepend' : 'append',
                            'el': container.prev().length ? container.prev() : container.parent()
                        };
                    }
                    container.find('script').remove();
                    panel = $('<div id="' + id + '"></div>').append(container);
                    tab = $('<li' + (label.hasClass('required') ? ' class="required"' : '') + '><a href="#' + id + '">' + lang + '</a></li>');
                    tabs_list.append(tab);
                    tabs_container.append(panel);
                });
                insertion_point.el[insertion_point.insert](tabs_container);
                tabs_container.tabs();
                tabs.push(tabs_container);
            });
            return tabs;
        }
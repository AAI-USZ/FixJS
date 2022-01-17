function (elem) {
                
                var target = $(elem).closest(".entry").find(".entry-container a.entry-title-link").first();
                return {
                    text: target.text(),
                    url: target.attr('href'),
                    placement: 'google-reader-icon'
                };
                
            }
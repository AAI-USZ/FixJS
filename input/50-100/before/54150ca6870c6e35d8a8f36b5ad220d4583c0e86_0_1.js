function (elem) {
                
                var target = $(elem).closest(".entry").find(".entry-container a.entry-title-link");
                return {
                    text: target.text(),
                    url: target.attr('href'),
                    placement: 'google-reader-icon'
                };
                
            }
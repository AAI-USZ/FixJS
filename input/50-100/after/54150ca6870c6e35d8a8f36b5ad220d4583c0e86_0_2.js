function (elem) {
                
                var target = $(elem).closest(".entry").find(".entry-main");
                return {
                    text: target.find('.entry-title').first().text(),
                    url: target.find('.entry-original').first().attr('href'),
                    placement: 'google-reader-icon'
                };
                
            }
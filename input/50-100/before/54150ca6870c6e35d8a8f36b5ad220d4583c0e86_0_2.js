function (elem) {
                
                var target = $(elem).closest(".entry").find(".entry-main");
                return {
                    text: target.find('.entry-title').text(),
                    url: target.find('.entry-original').attr('href'),
                    placement: 'google-reader-icon'
                };
                
            }
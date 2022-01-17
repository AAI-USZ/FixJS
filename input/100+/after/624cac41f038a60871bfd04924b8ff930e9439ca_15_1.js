function(ev, ui) {
            var $el = $(this);
            if ($el.attr('sakai-entityid') && $el.attr('sakai-entityname')) {
                initialize({
                    'uuid': $el.attr('sakai-entityid'),
                    'displayName': $el.attr('sakai-entityname'),
                    'pictureLink': $el.attr('sakai-entitypicture') || false
                });
            }
        }
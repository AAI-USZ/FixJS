function(element) {
        var carousel = element.data('jcarousel'),
            find     = function(element) {
                var carousel;
                element.find('*').each(function() {
                    carousel = $.data(this, 'jcarousel');
                    if (carousel) {
                        return false;
                    }
                });
                return carousel;
            };

        if (!carousel) {
            while (element.size() > 0) {
                carousel = find(element);

                if (carousel) {
                    break;
                }

                element = element.parent();
            }
        }

        return carousel;
    }
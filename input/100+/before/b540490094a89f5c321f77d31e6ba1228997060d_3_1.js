function() {
            var top = this;
            this.find("[data-rapid-page-data]").each(function() {
                page_data = $(this).data('rapid-page-data');
            });
            this.find("[data-rapid]").each(function() {
                var that = jQuery(this);
                jQuery.each(jQuery(this).data('rapid'), function(tag, annotations) {
                    tag = "hjq_"+tag.replace(/-/g, '_');
                    if(that[tag]) {
                        that[tag](annotations);
                    }
                });
            });
            return top;
        }
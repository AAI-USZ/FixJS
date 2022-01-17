function (response) {
                var form = jQuery('#type-metadata-form');
                form.hide();
                form.html(response);
                form.trigger('omeka:elementformload');
                form.slideDown(1000, function () {
                    // Explicit show() call fixes IE7
                    jQuery(this).show();
                });
            }
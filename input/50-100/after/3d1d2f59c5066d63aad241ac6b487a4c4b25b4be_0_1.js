function(){
            var slug = $(this).data('slug');
            $(this).find('form.multiple-action-form input[name^="checkbox_"]:hidden').remove();
            if (! (slug in reports)) {
                var advr = new advreport($(this));
                reports[slug] = advr;
            }
        }
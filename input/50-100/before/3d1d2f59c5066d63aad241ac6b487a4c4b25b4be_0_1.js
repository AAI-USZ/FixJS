function(){
            var slug = $(this).data('slug');
            if (! (slug in reports)) {
                var advr = new advreport($(this));
                reports[slug] = advr;
            }
        }
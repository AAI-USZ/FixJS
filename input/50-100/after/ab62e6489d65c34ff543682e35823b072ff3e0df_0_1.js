function () {
                var id  = $(this).attr('id');
                var sid = (id.length > 25) ? (id.slice(0, 22) + ' ...') : id; // sid => short/display id :P
                return '<li><a href="#' + id + '" title="' + id + '">' + sid + '</a></li>';
            }
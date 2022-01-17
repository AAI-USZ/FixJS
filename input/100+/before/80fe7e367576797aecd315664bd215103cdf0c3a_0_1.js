function(iv) {
                       var model = iv.model;
                       var vals = model.get_chain(['latitude','longitude']);
                       if (vals && vals.length > 0) {
                           iv.val_view.html(util.t("<%= latitude %>, <%= longitude %>", vals[0].attributes));
                           
                       } else {
                           var names  = model.get_chain(['place name']);
                           if (names && names.length > 0) {
                               iv.val_view.html(names[0].get('place name'));
                           } else {
                               iv.val_view.html(' :( ');
                           }
                       }
                   }
function(iv) {
                       var model = iv.model;
                       var vals = ce.apply_chain(model,['latitude','longitude']);
                       if (vals && vals.length > 0) {
                           iv.val_view.html(
                               util.t("<%= latitude %>, <%= longitude %>",
                                      vals[0].attributes));
                           
                       } else {
                           var names  = ce.apply_chain(model,['place name']);
                           if (names && names.length > 0) {
                               iv.val_view.html(vals[0].get('place name'));
                           } else {
                               iv.val_view.html(' :( ');
                           }
                       }
                   }
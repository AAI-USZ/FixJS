function(xml) {
                           var dbload = $.rdf().load(xml, {});
                           var json = dbload.databank.dump();
                           var json_ms = _(json).keys().map(function(k) {
                               var m = get_model(k);
                               _(m.attributes).extend(_(convert_values(json[k])).extend({_id:k}));
                               return m;
                           });                           
                           this_.reset(json_ms);
                           d.resolve(this_);
                       }
function(schema) {
            // only one top level key in ES = the type so we can ignore it
            // CKAN
            if (!schema){
              dfd.reject({'message':'Elastic Search did not return a mapping'});
              return;
            }
            var key = _.keys(schema)[0];
            var fieldData = _.map(schema[key].properties, function(dict, fieldName) {
              dict.id = fieldName;
              return dict;
            });
            model.fields.reset(fieldData);
            dfd.resolve(model, jqxhr);
          }
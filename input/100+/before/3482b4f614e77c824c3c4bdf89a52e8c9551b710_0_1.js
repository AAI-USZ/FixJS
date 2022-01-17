function(data){
            var b = {};
            b.toHTML = f.toHTML;
            b.fields = f.fields;
            Object.keys(b.fields).forEach(function(k){
                b.fields[k] = f.fields[k].bind(data[k]);
            });
            b.data = Object.keys(b.fields).reduce(function(a,k){
                a[k] = b.fields[k].data;
                return a;
            }, {});
            b.validate = function(callback){
                async.forEach(Object.keys(b.fields), function(k, callback){
                    f.fields[k].validate(b, function(err, bound_field){
                        b.fields[k] = bound_field;
                        callback(err);
                    });
                }, function(err){
                    callback(err, b);
                });
            };
            b.isValid = function(){
                var form = this;
                return Object.keys(form.fields).every(function(k){
                    return form.fields[k].error == null;
                });
            };
            return b;
        }
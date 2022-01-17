function (k) {
            if(k[0] !== '$') return;

            var val = commands[key][k];

            if(k === '$inc') {
              if(!obj[key]) obj[key] = 0;
              obj[key] += val;
            }
            if(k === '$push') {
              if(Array.isArray(obj[key])) {
                obj[key].push(val);
              } else {
                obj[key] = [val];
              }
            }
            if(k === '$pushAll') {
              if(Array.isArray(obj[key])) {
                if(Array.isArray(val)) {
                  for(var i = 0; i < val.length; i++) {
                    obj[key].push(val[i]); 
                  }
                }
              } else {
                obj[key] = val;
              }
            }
            if (k === '$pull') {
              if(Array.isArray(obj[key])) {
                obj[key] = obj[key].filter(function(item) {
                  return item !== val;
                });
              }
            }
            if (k === '$pullAll') {
              if(Array.isArray(obj[key])) {
                if(Array.isArray(val)) {
                  obj[key] = obj[key].filter(function(item) {
                    return val.indexOf(item) === -1;
                  });
                }
              }
            }
          }
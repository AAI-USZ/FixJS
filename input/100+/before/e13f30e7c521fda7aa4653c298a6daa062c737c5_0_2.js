function (k) {
            if(k[0] !== '$') return;

            var val = commands[key][k];

            if(k === '$inc') {
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
          }
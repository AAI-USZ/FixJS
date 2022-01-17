function(cb){
          var cmd, args, __ref, __this = this;
          if (!this.length) {
            return cb(null, this.results);
          }
          __ref = this.shift(), cmd = __ref[0], args = __slice.call(__ref, 1);
          console.log(db);
          console.log(cmd);
          console.log(db[cmd]);
          return db[cmd].apply(db, __slice.call(args).concat([function(_, result){
            __this.results.push(result);
            return __this.exec(cb);
          }]));
        }
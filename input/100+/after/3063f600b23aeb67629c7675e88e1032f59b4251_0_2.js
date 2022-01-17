function(err){
      var fs, Commands;
      if (db.DB === true) {
        console.log("==> Lost connection to Redis Server - attempting to reconnect");
      }
      if (db.DB) {
        return;
      }
      console.log(err);
      console.log("==> Falling back to JSON storage: " + process.cwd() + "/dump.json");
      fs = require('fs');
      db.DB = {};
      try {
        db.DB = JSON.parse(require('fs').readFileSync('dump.json', 'utf8'));
        console.log("==> Restored previous session from JSON file");
      } catch (__e) {}
      Commands = {
        bgsave: function(cb){
          fs.writeFileSync('dump.json', JSON.stringify(db.DB), 'utf8');
          return typeof cb === 'function' ? cb(null) : void 8;
        },
        get: function(key, cb){
          return typeof cb === 'function' ? cb(null, db.DB[key]) : void 8;
        },
        set: function(key, val, cb){
          db.DB[key] = val;
          return typeof cb === 'function' ? cb() : void 8;
        },
        rpush: function(key, val, cb){
          var __ref, __ref1;
          ((__ref1 = (__ref = db.DB)[key]) != null
            ? __ref1
            : __ref[key] = []).push(val);
          return typeof cb === 'function' ? cb() : void 8;
        },
        lrange: function(key, from, to, cb){
          var __ref, __ref1;
          return typeof cb === 'function' ? cb(null, (__ref1 = (__ref = db.DB)[key]) != null
            ? __ref1
            : __ref[key] = []) : void 8;
        },
        hset: function(key, idx, val){
          var __ref, __ref1;
          ((__ref1 = (__ref = db.DB)[key]) != null
            ? __ref1
            : __ref[key] = [])[idx] = val;
          return typeof cb === 'function' ? cb() : void 8;
        },
        hgetall: function(key, cb){
          var __ref, __ref1;
          return typeof cb === 'function' ? cb(null, (__ref1 = (__ref = db.DB)[key]) != null
            ? __ref1
            : __ref[key] = {}) : void 8;
        },
        del: function(keys, cb){
          var key, __i, __ref, __len;
          for (__i = 0, __len = (__ref = Array.isArray(keys)
            ? keys
            : [keys]).length; __i < __len; ++__i) {
            key = __ref[__i];
            delete db.DB[key];
          }
          return typeof cb === 'function' ? cb(null) : void 8;
        }
      };
      __importAll(db, Commands);
      return db.multi = function(){
        var cmds, name;
        cmds = __slice.call(arguments);
        for (name in Commands) {
          (__fn.call(this, name));
        }
        cmds.results = [];
        cmds.exec = function(cb){
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
        };
        return cmds;
        function __fn(name){
          console.log(name);
          cmds[name] = function(args){
            args == null && (args = []);
            this.push([name].concat(__slice.call(args)));
            return this;
          };
        }
      };
    }
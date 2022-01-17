function (out) {
        try { chan.say(r.formatter(out)); }
        catch (err) {
          console.error('%s Module %s formatter failed!', 'ERROR'.red, r.module);
          console.log(err.stack);
        }
      }
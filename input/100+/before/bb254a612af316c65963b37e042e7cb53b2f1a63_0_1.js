function() {
        opt = {};
        if(this.options.hasChanged('page')) {
          opt.add = true;
          opt.changingPage = true;
          // if user is going backwards insert new rows at the top
          if(this.options.previous('page') > this.options.get('page')) {
            opt.at = 0;
          }
        }

        opt.success = function() {
           if(opt.changingPage) {
             self.trigger('newPage', self.options.get('page'), opt.at === 0? 'up': 'down');
           }
        };
        opt.error = function() {
          cdb.log.error("there was some problem fetching rows");
        };
        this.fetch(opt);
      }
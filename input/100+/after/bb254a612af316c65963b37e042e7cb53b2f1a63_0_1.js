function(models, options) {
      var self = this;
      this.table = options.table;
      this.model.prototype.idAttribute = 'cartodb_id';
      // dont bind directly to fetch because change send
      // options that are use in fetch
      this.linkToSchema();
      this.filter = null;
      this._fetching = false;
      this.options.bind('change', function() {
        if(self._fetching) {
          return;
        }
        console.log("=locked " + this.options.get('page'));
        self._fetching = true;
        opt = {};
        var previous = this.options.previous('page');
        console.log('previous ' + previous);

        if(this.options.hasChanged('page')) {
          opt.add = true;
          opt.changingPage = true;
          // if user is going backwards insert new rows at the top
          if(previous > this.options.get('page')) {
            opt.at = 0;
          }
        }

        opt.success = function(_coll, resp) {
          if(resp.rows.length !== 0) {
            if(opt.changingPage) {
              self.trigger('newPage', self.options.get('page'), opt.at === 0? 'up': 'down');
            }
          } else {
            // no data so do not change the page
            self.options.set({page: previous});//, { silent: true });
            console.log("reverted to " + previous);
          }
          console.log(self.options.attributes.page);
          self._fetching = false;
        console.log("=unlocked");
        };
        opt.error = function() {
          cdb.log.error("there was some problem fetching rows");
          self._fetching = false;
        };
        this.fetch(opt);
      }, this);
    }
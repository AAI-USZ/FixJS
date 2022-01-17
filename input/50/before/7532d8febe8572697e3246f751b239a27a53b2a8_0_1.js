function() {
      cdb.log.debug("compiling carto");
      var style = this.$('textarea').val();
      // compile and validate
      this.model.set({ style: style });
    }
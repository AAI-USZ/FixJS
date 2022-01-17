function() {
      cdb.log.debug("compiling carto");
      var style = this.$('textarea').val();
      // compile and validate
      this.model.set({ tile_style: style });
    }
function(e, resp) {
            cdb.log.error("can't rename column");
            self.error('error renaming column', resp);
          }
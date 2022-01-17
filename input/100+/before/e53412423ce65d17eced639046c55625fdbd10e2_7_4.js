function() {
      self.expect_messageSubject(null, expectSubject);
      var foundIt = false;
      if (funcOpts.expect)
        funcOpts.expect();

      viewThing.slice.onadd = function(header) {
        if (header.subject !== expectSubject)
          return;
        self._logger.messageSubject(null, header.subject);
        foundIt = true;
        if (funcOpts.withMessage)
          funcOpts.withMessage(header);
      };
      viewThing.slice.oncomplete = function() {
        if (foundIt)
          return;
        setTimeout(function() {
          viewThing.slice.refresh();
        }, 150);
      };
      viewThing.slice.refresh();
    }
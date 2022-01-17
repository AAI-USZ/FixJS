function() {
        if (self.destroy()) {
          originalViewDestroyFunction.call(this);
        }
      }
function() {
      if (joePrivate.globalSuite == null) {
        joePrivate.globalSuite = new Suite({
          name: 'joe'
        });
      }
      return joePrivate.globalSuite;
    }
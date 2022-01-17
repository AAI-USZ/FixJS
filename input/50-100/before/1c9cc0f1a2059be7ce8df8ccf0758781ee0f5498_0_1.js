function() {
    if( args.build ) {
      build.startBuild();
    } else if( args.docs ) {
      build.makeDocs();
    } else if( args.test ) {
      build.runTests();
    }

  }
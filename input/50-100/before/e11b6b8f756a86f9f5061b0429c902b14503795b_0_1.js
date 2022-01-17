function(e) {
    console.error("There was an internal error in Node's debugger. " +
        'Please report this bug.');
    console.error(e.message);
    console.error(e.stack);
    if (interface.child) interface.child.kill();
    process.exit(1);
  }
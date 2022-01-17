function resolve (mdl, caller__dirname) {
  
  // Resolve relative file requires, e.g., './mylib'
  if ( mdl.match(/^(\.{1,2}\/)/) ) {

    if (!caller__dirname) {
      console.trace();
      throw new ProxyquireError('In order to resolve relative modules, caller__dirname is required');
    }

    // We use the __dirname of the script that is requiring, to get same behavior as if real require was called from it directly.
    return path.join(caller__dirname, mdl);

  } else {
    
    // Don't change references to global or 'node_module' requires, e.g. 'path' or absolute paths e.g. '/user/bin/module.js'
    return mdl;
  }
}
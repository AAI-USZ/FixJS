function parse() {
  var args = slice.call(arguments).reduce(function reduce(memory, arg) {
    memory[typeof arg] = arg;
    return memory;
  }, {});

  // a new bundle is loaded so kill the current package if it exists
  this.package = {};

  if (args.string) {
    // oh, we got a string, assume filename, fetch the file and parse it but
    // first we gonna check if it's complete
    if (path.extname(args.string) !== '.json') {
      args.string = path.join(args.string, 'square.json');
    }

    try {
      args.package = fs.readFileSync(args.string, 'utf8');
      this.package = this.fromJSON(args.string);          // the parsed file
      this.package.path = path.dirname(args.string);      // folder of the bundle
      this.package.source = args.package;                 // stringified content
      this.package.location = args.string;                // location of the bundle
    } catch (e) {
      return this.critical('Failed to parse the bundle', e.stack);
    }
  } else if (args.object) {
    // when we receive an object in the arguments we assume it's the parse package
    // details
    try {
      this.package = args.object;                         // the package
      this.package.path = path.dirname(process.env.PWD);  // folder of the bundle
      this.package.source = JSON.stringify(args.object);  // stringified content
      this.package.location = process.env.PWD;            // location of the bundle
    } catch (e) {
      return this.critical('Failed to parse the bundle', e.stack);
    }
  } else {
    return this.critical('Unsupported bundled');
  }

  return this.parse();
}
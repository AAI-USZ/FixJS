function bundle () {
  var args = slice.call(arguments).reduce(function reduce (memory, arg) {
    memory[typeof arg] = arg;
    return memory;
  }, {});

  // when we receive an object in the arguments we assume it's the parse package
  // details
  this.package = args.object;

  // oh, we got a string, assume filename, fetch the file and parse it
  if (args.string) {
    try {
      args.package = fs.readFileSync(args.string, 'utf8');
      this.package = JSON.parse(args.package);        // the parsed file
      this.package.path = path.dirname(args.string);  // folder of the bundle
      this.package.source = args.package;             // stringified content
      this.package.location = args.string;            // location of the bundle
    } catch (e) {
      this.logger.critical('Failed to parse the bundle', e.stack);
      process.exit(1); // if we can't parse it, we shouldn't continue at all
    }
  }

  // make sure that the package is in the correct format so we need to do some
  // extra validation
  if (!this.package.bundle) {
    this.logger.critical('Missing `bundle.bundle` object');
    process.exit(1);
  }

  return this.parse();
}
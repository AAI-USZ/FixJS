function parse() {
  var args = slice.call(arguments).reduce(function reduce(memory, arg) {
        memory[typeof arg] = arg;
        return memory;
      }, {})
    , extension
    , exists;

  // a new bundle is loaded so kill the current package if it exists
  this.package = {};

  try {
    // assume that we where called with a string, which is a path to a file that
    // follows our square.json specification.
    if (args.string) {
      // get the extension, so we know what type of file we are dealing with
      // here..
      extension = path.extname(args.string);
      exists = fs.existsSync(args.string);

      // if the file doesn't exist, it could be that they forgot to append .json
      // to the file name, so do a check for that..
      if (!exists && fs.existsSync(args.string + '.json')) {
        args.string = args.string + '.json';
        extension = '.json';
        exists = true;
      }

      // it doesn't exist, bail out
      if (!exists) return this.critical('Failed to parse bundle, %s does not exist ', args.string);

      // handle node.js styled requires
      if (extension === '.js') {
        this.package = require(args.string);
        args.package = JSON.stringify(this.package);
      } else {
        this.package = this.fromJSON(args.string);
        args.package = fs.readFileSync(args.string, 'utf8');
      }

      this.package.path = path.dirname(args.string);      // folder of the bundle
      this.package.source = args.package;                 // stringified content
      this.package.location = args.string;                // location of the bundle
    } else if (args.object) {
      this.package = args.object;
      args.package = JSON.stringify(this.package);

      this.package.path = path.dirname(process.env.PWD);  // folder of the bundl
      this.package.source = args.package;                 // stringified content
      this.package.location = process.env.PWD;            // location of the bundle
    } else {
      return this.critical('Unsupported bundled');
    }
  } catch (e) {
    return this.critical('Failed to parse the bundle', e.stack);
  }

  return true;
}
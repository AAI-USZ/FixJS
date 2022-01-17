function(argv) {
    this.print = this.print || function(str, code) {
      console.log(str + '\n');
      process.exit(code || 0);
    };
    this._help = this._help || "";
    this._script = this._script || process.argv[0] + " "
          + require('path').basename(process.argv[1]);    
    this.specs = this.specs || {};

    var argv = argv || process.argv.slice(2);
    
    var arg = Arg(argv[0]).isValue && argv[0],
        command = arg && this.commands[arg],
        commandExpected = !_(this.commands).isEmpty();
    
    if (commandExpected) {
       if (command) {
          _(this.specs).extend(command.specs);  
          this._script += " " + command.name;
          if (command.help) {
            this._help = command.help;
          }
          this.command = command;
       }
       else if (arg) {
          return this.print(this._script + ": no such command '" + arg + "'", 1);
       }
       else {
          // no command but command expected e.g. 'git -v'
          this.specs.command = {
            position: 0,
            help: 'one of: ' + _(this.commands).keys().join(", ")
          }
          if (this.fallback) {
            _(this.specs).extend(this.fallback.specs);
            this._help = this.fallback.help;         
          }
       }
    }

    if (this.specs.length === undefined) {
      // specs is a hash not an array
      this.specs = _(this.specs).map(function(opt, name) {
        opt.name = name;
        return opt;
      });
    }
    this.specs = this.specs.map(function(opt) {
      return Opt(opt);
    });

    if (argv.indexOf("--help") >= 0 || argv.indexOf("-h") >= 0) {
      return this.print(this.getUsage());        
    }

    var options = {};
    var args = argv.map(function(arg) {
      return Arg(arg);
    })
    .concat(Arg());

    var positionals = [];

    /* parse the args */
    var that = this;
    args.reduce(function(arg, val) {
      /* positional */
      if (arg.isValue) {
        positionals.push(arg.value);
      }
      else if (arg.chars) {
        var last = arg.chars.pop();
        
        /* -cfv */
        (arg.chars).forEach(function(ch) {
          that.setOption(options, ch, true);
        });

        /* -v key */
        if (!that.opt(last).flag) {
           if (val.isValue)  {
              that.setOption(options, last, val.value);
              return Arg(); // skip next turn - swallow arg                
           }
           else {
              that.print("'-" + (that.opt(last).name || last) + "'"
                + " expects a value\n\n" + that.getUsage(), 1);
           }
        }
        else {
          /* -v */
          that.setOption(options, last, true);
        }

      }
      else if (arg.full) {
        var value = arg.value;

        /* --key */
        if (value === undefined) {
          /* --key value */
          if (!that.opt(arg.full).flag) {
            if (val.isValue) {
              that.setOption(options, arg.full, val.value);
              return Arg();           
            }
            else {
              that.print("'--" + (that.opt(arg.full).name || arg.full) + "'"
                + " expects a value\n\n" + that.getUsage(), 1);
            }
          }
          else {
            /* --flag */
            value = true;
          }
        }
        that.setOption(options, arg.full, value);
      }
      return val;
    });

    positionals.forEach(function(pos, index) {
      this.setOption(options, index, pos);
    }, this);
    
    options._ = positionals;
    
    this.specs.forEach(function(opt) {
      if (opt.default !== undefined && options[opt.name] === undefined) {
        options[opt.name] = opt.default;
      }
    }, this);

    // exit if required arg isn't present
    this.specs.forEach(function(opt) {
      if (opt.required && options[opt.name] === undefined) {
         this.print("\n" + opt.name + " argument is required\n" + this.getUsage(), 1);
      }
    }, this);

    if (command && command.cb) {
      command.cb(options);        
    }
    else if (this.fallback && this.fallback.cb) {
      this.fallback.cb(options);        
    }

    return options;
  }
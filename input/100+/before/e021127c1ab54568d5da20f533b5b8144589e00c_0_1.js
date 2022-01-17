function (err, tree) {

          if (err) {
            // push to errors array
            that.errors.push(err)

            // less gave up trying to parse the data ;_;
            that.log(err.name.red + ": " + err.message + ' of ' + err.filename.yellow + '\n')

            // if extract - then log it
            err.extract && err.extract.forEach(function (line, index) {
              that.log(util.padLine(err.line + index) + line)
            })

            // add extra line for readability after error log
            that.log(" ")

            // exit with callback if present
            return that.callback && that.callback()
          }

          // test to see if file has a less extension
          if (/less$/.test(that.path) && !that.parsed) {

            // if it's a LESS file, we flatten it
            that.data = tree.toCSS({})

            // set parse to true so as to not infinitely reparse less files
            that.parsed = true

            // reparse less file
            return that.parse()
          }

          // set definitions to parse tree
          that.definitions = tree.rules

          // validation defintions
          that.options.compile ? that.compile() : that.validate()
        }
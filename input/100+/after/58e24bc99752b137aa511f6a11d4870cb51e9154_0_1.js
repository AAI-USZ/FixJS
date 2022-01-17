function (filepath) {
        var opts = this.options;
        
        if (!opts.nosearch) {
            filepath = filepath || this.sakefileLocation();

            if (!existsSync(filepath)) {
                throw new Error("Can not find a Sakefile.");
            }

            filepath = Path.resolve(filepath);
            opts.sakefile = filepath;
        }
        
        if (opts.nochdir) {
            log.info("sake file: " + filepath);
        }
        else {
            process.chdir(Path.dirname(filepath));
        }

        log.info("sake in " + process.cwd());

        this.sake = require("sake");
        if (filepath) {
            this.sake.load(filepath);
        }
    }
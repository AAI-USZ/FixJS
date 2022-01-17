function() {
        var configFileName = path.join(this.options.root, this.options.tmpl),
            stat, src, ast;

        stat = fs.statSync(configFileName);

        if(!stat.isFile()) {
            console.error("Invalid config file or unable to find valid config file");
            process.exit(1);
        }

        src = fs.readFileSync(configFileName, "utf-8");

        // need range info to properly inject metadata
        ast = esprima.parse(src, {
            range : true
        });

        return {
            ast : ast,
            src : src
        };
    }
function() {
        var configFileName = path.join(this.root, this.tmpl),
            stat, src;

        stat = fs.statSync(configFileName);

        if(!stat.isFile()) {
            console.error("Invalid config file or unable to find valid config file");
            process.exit(1);
        }

        src = fs.readFileSync(configFileName, "utf-8");

        // need comment & range info to properly re-inject comments later... maybe
        this._templateConfig = esprima.parse(src, {
            comment : true,
            range : true
        });

        return this._templateConfig;
    }
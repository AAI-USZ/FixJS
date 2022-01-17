function(o) {

        this.bundlesLevel = o.bundlesLevel;
        this.levelsPaths = o.levels;
        this.levels = o.levels.map(createLevel);
        this.declPath = o.declPath;
        this.techName = o.techName;
        this.output = o.output;
        this.forked = typeof o.forked === 'undefined'? true : !!o.forked;

        // NOTE: Every time we need new tech object so we use createTech().
        // If we use getTech(), we'll overwrite context of the same tech
        // object that is prone to collisions
        this.tech = this.bundlesLevel.createTech(o.techName, o.techPath);
        this.techPath = this.tech.getTechPath();
        this.tech.setContext(new Context(this.levels));

        this.__base(U.extend({ path: this.__self.createId(o) }, o));

    }
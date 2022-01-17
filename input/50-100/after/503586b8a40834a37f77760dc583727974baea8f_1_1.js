function(level, opts) {
        var levels = opts.level;
        this.level = level;
        this.levels = !levels? [] : Array.isArray(levels)? levels : [levels];
        this.opts = opts || {};
        this.techs = this.initOptsTechs();
        this._techsCache = {};
    }
function(levels, opts) {
        this.levels = !levels? [] : Array.isArray(levels)? levels : [levels];
        this.opts = opts || {};
        this.techs = this.initOptsTechs();
        this._techsCache = {};
    }
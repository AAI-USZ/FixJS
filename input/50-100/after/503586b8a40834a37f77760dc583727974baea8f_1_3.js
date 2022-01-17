function(techIdent) {
        // NOTE: this.techs has not been initialized when resolveTechName() called
        // from initOptsTechs(). It is not so good as it could be, need to rethink.
        var techPath = this.techs? this.techs[techIdent] : null;
        if(techPath || !this.getLevel()) return techPath;
        return this.getLevel().resolveTechName(techIdent);
    }
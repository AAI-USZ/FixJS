function(techIdent) {
        // NOTE: this.techs не инициализирована в момент первоначальной
        // инициализации технологий в конструкторе. Упячечно, надо сделать
        // лучше.
        var techPath = this.techs? this.techs[techIdent] : null;
        if(techPath || !this.levels.length) return techPath;
        var level, i = this.levels.length;
        while(!techPath && (level = this.levels[--i])) {
            techPath = level.resolveTechName(techIdent);
        }
        return techPath;
    }
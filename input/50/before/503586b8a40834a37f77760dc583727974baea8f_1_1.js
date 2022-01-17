function(techIdent) {
        return (bemUtil.isPath(techIdent) && this.resolveTechPath(techIdent)) ||
            (this.levels.length && this.resolveTechName(techIdent)) ||
            bemUtil.getBemTechPath(techIdent);
    }
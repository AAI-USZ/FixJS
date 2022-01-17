function(techIdent) {
        return (bemUtil.isPath(techIdent) && this.resolveTechPath(techIdent)) ||
            (this.getLevel() && this.resolveTechName(techIdent)) ||
            bemUtil.getBemTechPath(techIdent);
    }
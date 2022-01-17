function(path) {
        var tech = require(path),
            TechClass = Tech;

        if(tech.Tech) return tech.Tech;
        if(tech.baseTechPath) TechClass = getTechClass(tech.baseTechPath);
        else if (tech.techModule || tech.bemBuild || tech.bemCreate) TechClass = LegacyTech;

        return INHERIT(TechClass, tech);
    }
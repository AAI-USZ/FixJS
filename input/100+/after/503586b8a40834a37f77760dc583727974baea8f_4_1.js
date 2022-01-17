function(module, level) {

        var tech = typeof module === 'string'? require(module) : module,
            TechClass = Tech;

        // link to tech class found in Tech property
        if (tech.Tech) return tech.Tech;

        // path to base tech module found in baseTechPath property
        if (tech.baseTechPath) {
            TechClass = getTechClass(tech.baseTechPath, level);
        }

        // base tech name found in baseTechName property
        else if (tech.baseTechName) {
            if (!level) throw new Error('getTechClass(): level argument must be specified to resolve techs by name');
            TechClass = getTechClass(level.resolveTech(tech.baseTechName), level);
        }

        // link to base tech class found in baseTech property
        else if (tech.baseTech) {
            TechClass = tech.baseTech;
        }

        // legacy tech module detected, should use LegacyTech shim
        else if (tech.techModule || tech.bemBuild || tech.bemCreate) {
            TechClass = LegacyTech;
        }

        return INHERIT(TechClass, tech.techMixin || tech);

    }
function(techIdent) {
                var techPath = this.resolveTech(techIdent),
                    techName = bemUtil.isPath(techIdent)?
                        createTech(techPath).getTechName() :
                        techIdent;
                techs[techName] = techPath;
                return techName;
            }
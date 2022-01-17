function(techIdent) {
                var techPath = this.resolveTech(techIdent),
                    techName = bemUtil.isPath(techIdent)?
                        createTech(techPath, null, this.getLevel()).getTechName() :
                        techIdent;
                techs[techName] = techPath;
                return techName;
            }
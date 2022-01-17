function() {
                try {
                    var entities = VIE.Util.rdf2Entities(service, results);
                    entities = (_.isArray(entities))? entities : [ entities ];
                    for (var e = 0; e < entities.length; e++) {
                    	entities[e].set("DBPediaServiceLoad", VIE.Util.xsdDateTime(new Date()));
                    }
                    entities = (entities.length === 1)? entities[0] : entities;
                    loadable.resolve(entities);
                } catch (e) {
                    loadable.reject(e);
                }
            }
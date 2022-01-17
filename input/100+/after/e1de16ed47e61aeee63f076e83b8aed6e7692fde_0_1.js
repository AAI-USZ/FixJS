function() {
                try {
                    var entities = VIE.Util.rdf2Entities(service, results);
                    entities = (_.isArray(entities))? entities : [ entities ];
                    for (var e = 0; e < entities.length; e++) {
                    	entities[e].set("DBPediaServiceLoad", VIE.Util.xsdDateTime(new Date()));
                    }
                    var retCollection = new service.vie.Collection(entities);
                    loadable.resolve(retCollection);
                } catch (e) {
                    loadable.reject(e);
                }
            }
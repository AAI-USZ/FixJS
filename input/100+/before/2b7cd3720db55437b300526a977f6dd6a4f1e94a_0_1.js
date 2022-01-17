function(facetName){
            var config = ConnectorConfig[App.getFacetConnector(facetName)];
            if (config == null){
                console.log("WARNING: No config found for connector: " + connectorName);
                config = ConnectorConfig.default;
            }
            var finalConfig = $.extend({},config);
            finalConfig.facets = null;
            var facet = config.facets[App.getFacetObjectType(facetName)];
            if (facet != null){
                for (var member in facet){
                    finalConfig[member] = facet[member];
                }
            }
            return finalConfig;

        }
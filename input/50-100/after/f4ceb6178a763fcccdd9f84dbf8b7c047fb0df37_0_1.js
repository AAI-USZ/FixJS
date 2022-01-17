function(proxy, bus) {
                this.proxy = proxy;
                this.bus = bus;
                this.IE8 = false;
                this.sql = '' +
                    'SELECT DISTINCT l.scientificname as name,' +
                    '       l.type as type,'+
                    '       t.title as type_title,'+
                    '       l.provider as source, '+
                    '       p.title as source_title,'+
                    '       n.class as _class, ' +
                    '       l.feature_count as feature_count,'+
                    '       n.common_names_eng as names,' +
                    '       CONCAT(\'{sw:{lat:\',ST_XMin(l.extent),\', lng:\',ST_YMin(l.extent),\'} , ne:{lat:\',ST_XMax(l.extent),\', lng:\',ST_YMax(l.extent),\'}}\') as extent ' +
                    'FROM layer_metadata l ' +
                    'LEFT JOIN types t ON ' +
                    '       l.type = t.type ' +
                    'LEFT JOIN providers p ON ' +
                    '       l.provider = p.provider ' +
                    'LEFT JOIN taxonomy n ON ' +
                    '       l.scientificname = n.scientificname ' +
                    'WHERE ' +
                    "  l.scientificname~*'\\m{0}' OR n.common_names_eng~*'\\m{0}'";
                this.term = null;
             }
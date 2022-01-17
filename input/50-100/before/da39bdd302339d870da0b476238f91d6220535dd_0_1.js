function indexAll(docs) {
            var lookupTable = {},
                hasOwnProperty = Object.prototype.hasOwnProperty;

            docs.forEach(function(doc) {
                if ( !hasOwnProperty.call(lookupTable, doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            });
            docs.index = lookupTable;
        }
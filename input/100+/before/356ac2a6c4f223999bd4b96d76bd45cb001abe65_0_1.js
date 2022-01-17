function indexAll(docs) {
            var lookupTable = {},
                hasOwnProp = Object.prototype.hasOwnProperty;

            docs.forEach(function(doc) {
                if ( !hasOwnProp.call(lookupTable, doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            });
            docs.index = lookupTable;
        }
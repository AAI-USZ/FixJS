function(doc) {
                if ( !hasOwnProperty.call(lookupTable, doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            }
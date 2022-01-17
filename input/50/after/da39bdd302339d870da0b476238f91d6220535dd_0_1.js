function(doc) {
                if ( !hasOwnProp.call(lookupTable, doc.longname) ) {
                    lookupTable[doc.longname] = [];
                }
                lookupTable[doc.longname].push(doc);
            }
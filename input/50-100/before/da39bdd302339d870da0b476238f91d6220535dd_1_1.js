function(doc) {
                var name = doc.longname;
                if ( !hasOwnProperty.call(docs.index, name) ) {
                    docs.index[name] = [];
                }
                docs.index[name].push(doc);
                docs.push(doc);
            }
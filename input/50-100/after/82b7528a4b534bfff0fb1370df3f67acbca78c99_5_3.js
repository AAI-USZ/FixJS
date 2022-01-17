function(doc) {
        if (doc.type == "ecal") {
            var c = new Date(doc.created);
            var created = c.getTime();
            var short_created = c.toLocaleString();
            var d = {
                type: doc.type,
                pass: doc.pass,
                created: doc.created,
                short_created: short_created,
                archived: doc.archived,
                crates: doc.crates
            };
            emit(-created, d);
        }
    }
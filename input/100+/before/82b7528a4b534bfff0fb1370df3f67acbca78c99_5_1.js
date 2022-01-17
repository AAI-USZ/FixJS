function(db) {
                   var c = new Date(doc.created);
                   var created = -c.getTime();
                   emit([db.db_id, created], {'type': doc.type, 'pass': doc.pass, 'created': doc.created, 'config': doc.config, 'archived': doc.archived});
               }
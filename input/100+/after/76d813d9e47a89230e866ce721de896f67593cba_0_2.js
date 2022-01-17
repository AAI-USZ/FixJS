function(data) {
          if (!doc._rev) {
            doc._rev = data._rev;
          }
          //console.log(data._rev)
          //console.log(doc._rev)
          doc._attachments = data._attachments;
          if (preserve_fields) {
            for (i in preserve_fields) {
              doc[preserve_fields[i]] = data[preserve_fields[i]];
            }
          }
          p.settings.db.saveDoc(doc, {
            success: function() {
              //console.log('updated');
            },
            error: function() {
              //console.log('error updating!');
            }});
        }
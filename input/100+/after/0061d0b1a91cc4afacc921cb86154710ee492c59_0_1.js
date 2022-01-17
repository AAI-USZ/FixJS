function(req) {
              try {
                var resp = $.parseJSON(req.responseText);
              } catch(e) {
                if (options.error) {
                  options.error(req.status, req, e);
                } else {
                  throw errorMessage + ': ' + e;
                }
                return;
              }
              if (req.status == 200 || req.status == 201 || req.status == 202) {
                doc._id = resp.id;
                doc._rev = resp.rev;
                if (versioned) {
                  db.openDoc(doc._id, {
                    attachPrevRev : true,
                    success : function(d) {
                      doc._attachments = d._attachments;
                      if (options.success) options.success(resp);
                    }
                  });
                } else {
                  if (options.success) options.success(resp);
                }
              } else if (options.error) {
                options.error(req.status, resp.error, resp.reason);
              } else {
                throw "The document could not be saved: " + resp.reason;
              }
            }
function(doc, req) {
    doc.archived = false;

    // unarchive all tests related to final_test or ecal
    if (doc.type == "final_test") {
        db.getView('final_test', {startkey: [doc._id], endkey: [doc._id, 2]}, function(err, resp) {
            for (i in resp.rows) {
                if (resp.rows[i].value.type != "final_test") {
                    resp.rows[i].value.archived = false;
                    db.saveDoc(resp.rows[i].value, {db: 'debugdb'}, function(err, resp) {});
                }
            }
        });
    }

    if (doc.type == "ecal") {
        db.getView('ecal', {startkey: [doc._id], endkey: [doc._id, 2]}, function(err, resp) {
            for (i in resp.rows) {
                if (resp.rows[i].value.type != "ecal") {
                    resp.rows[i].value.archived = false;
                    db.saveDoc(resp.rows[i].value, {db: 'debugdb'}, function(err, resp) {});
                }
            }
        });
    }
    if (req.client) {
      content = templates.render('test_unarchived.html', req, {});
    }
    else {
      content = templates.render('base.html', req, {
        content: content,
        title: title
      });
    }
    return [doc, {content: content, title: 'Test unarchived'}];
}
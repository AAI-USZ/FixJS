function(err, info2) {
          revs.unshift(info2.rev.split('-')[1]);
          db.put({_id: info.id, _rev: info2.rev, last: 'test2'}, function(err, info3) {
            revs.unshift(info3.rev.split('-')[1]);
            db.get(info.id, {revs:true}, function(err, doc) {
              ok(doc._revisions.start === 3, 'correct starting position');
              same(revs, doc._revisions.ids, 'correct revs returned');
              start();
            });
          });
        }
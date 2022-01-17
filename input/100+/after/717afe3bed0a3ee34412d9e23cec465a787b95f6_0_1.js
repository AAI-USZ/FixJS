function onsuccess(event) {
      if (!event.target.result) {
        if (opts.continuous && !opts.cancelled) {
          IdbPouch.Changes.addListener(name, id, opts);
        }
        results.map(function(c) {
          if (opts.filter && !opts.filter.apply(this, [c.doc])) {
            return;
          }
          if (!opts.include_docs) {
            delete c.doc;
          }
          call(opts.onChange, c);
        });
        return false;
      }
      var cursor = event.target.result;
      var index = txn.objectStore(DOC_STORE);
      index.get(cursor.value._id).onsuccess = function(event) {
        var metadata = event.target.result;
        if (/_local/.test(metadata.id)) {
          return cursor['continue']();
        }

        var change = {
          id: metadata.id,
          seq: cursor.key,
          changes: collectLeaves(metadata.rev_tree),
          doc: cursor.value,
        };

        change.doc._rev = winningRev(metadata.rev_tree[0].pos,
                                     metadata.rev_tree[0].ids);

        if (metadata.deleted) {
          change.deleted = true;
        }
        if (opts.conflicts) {
          change.doc._conflicts = collectConflicts(metadata.rev_tree);
        }

        // Dedupe the changes feed
        results = results.filter(function(doc) {
          return doc.id !== change.id;
        });
        results.push(change);
        cursor['continue']();
      };
    }
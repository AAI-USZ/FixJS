function complete(event) {
      var aresults = [];
      results.sort(sortByBulkSeq);
      results.forEach(function(result) {
        delete result._bulk_seq;
        if (result.error) {
          aresults.push(result);
          return;
        }
        var metadata = result.metadata;
        var rev = winningRev(metadata.rev_tree[0].pos, metadata.rev_tree[0].ids);
        aresults.push({
          ok: true,
          id: metadata.id,
          rev: rev,
        });

        if (/_local/.test(metadata.id)) {
          return;
        }

        var change = {
          id: metadata.id,
          seq: metadata.seq,
          changes: collectLeaves(metadata.rev_tree),
          doc: result.data
        };
        change.doc._rev = rev;
        update_seq++;
        IdbPouch.Changes.emitChange(name, change);
      });
      call(callback, null, aresults);
    }
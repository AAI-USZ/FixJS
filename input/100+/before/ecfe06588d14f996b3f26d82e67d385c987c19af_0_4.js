function updateDoc(cursor, oldDoc, docInfo) {
      var merged = Pouch.merge(oldDoc.rev_tree,
                               docInfo.metadata.rev_tree[0], 1000);
      var inConflict = (oldDoc.deleted && docInfo.metadata.deleted) ||
        (!oldDoc.deleted && newEdits && merged.conflicts !== 'new_leaf');

      if (inConflict) {
        results.push(makeErr(Pouch.Errors.REV_CONFLICT, docInfo._bulk_seq));
        return cursor['continue']();
      }

      docInfo.metadata.rev_tree = merged.tree;

      writeDoc(docInfo, function() {
        cursor['continue']();
      });
    }
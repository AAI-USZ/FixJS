function insertDoc(docInfo) {
      // Cant insert new deleted documents
      if (docInfo.metadata.deleted) {
        return results.push(Pouch.Errors.MISSING_DOC);
      }
      writeDoc(docInfo);
    }
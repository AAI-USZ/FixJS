function insertDoc(docInfo) {
      // Cant insert new deleted documents
      if (docInfo.metadata.deleted) {
        results.push(Pouch.Errors.MISSING_DOC);
        return processDocs();
      }
      writeDoc(docInfo, processDocs);
    }
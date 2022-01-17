function (e) {
        var docsLookupVal = $.trim($(this).val());
        if (latestSearch === docsLookupVal) {
          return true;
        }
        self.searchedDocumentCell.setValue(docsLookupVal);
        self.documentsPageNumberCell.setValue(0);
      }
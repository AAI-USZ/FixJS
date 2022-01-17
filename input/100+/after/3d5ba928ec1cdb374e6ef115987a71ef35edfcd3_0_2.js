function showDocumentListState(page) {
      prevBtn.toggleClass('disabled', page.pageNumber === 0);
      nextBtn.toggleClass('disabled', isLastPage(page));

      docsTotalItemCont.text(page.isLookupList ? 'unknown' : page.docs.total_rows || 0);
      docsCrntPgCont.text(page.pageNumber + 1 + ' of ' + (page.isLookupList ? 'unknown' : Math.ceil(page.docs.total_rows / page.pageLimit) || 1 ) );

      var firstRow = page.docs.rows[0];
      if (firstRow && firstRow.key instanceof Object) {
        var error = new Error(firstRow.key.error);
        error.explanatoryMessage = '(' + firstRow.key.reason + ')';
        showDocumetsListErrorState(error);

        renderTemplate('documents_list', {
          loading: false,
          rows: [],
          pageNumber: page.pageNumber,
          bucketName: page.bucketName
        });
      } else {
        showDocumetsListErrorState(false);

        $.each(page.docs.rows, function (i) {
          removeSpecialKeys(page.docs.rows[i].doc, true);
        });

        renderTemplate('documents_list', {
          loading: false,
          rows: page.docs.rows,
          pageNumber: page.pageNumber,
          bucketName: page.bucketName
        });
      }
    }
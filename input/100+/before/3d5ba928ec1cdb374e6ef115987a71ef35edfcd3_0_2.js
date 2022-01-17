function showDocumentListState(page) {
      prevBtn.toggleClass('disabled', page.pageNumber === 0);
      nextBtn.toggleClass('disabled', isLastPage(page));

      showDocumentState(false);

      renderTemplate('documents_list', {
        loading: false,
        rows: page.docs.rows,
        pageNumber: page.pageNumber,
        bucketName: page.bucketName
      });
    }
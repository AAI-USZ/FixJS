function (docs, currentPage, selectedBucket, pageLimit, searchedDoc) {
        if (typeof currentPage === 'number') {
          prevPage = currentPage - 1;
          prevPage = prevPage < 0 ? 0 : prevPage;
          nextPage = currentPage + 1;
          page.pageLimit = pageLimit;
          page.pageNumber = currentPage;
          page.isLookupList = !!searchedDoc;
        }
        if (docs) {
          page.docs = docs;
          page.bucketName = selectedBucket;
          showDocumentListState(page);
        } else {
          renderTemplate('documents_list', {loading: true});
          if (searchedDoc) {
            // we don't know number of matches. that's why we can't allow user to quick clicks on next button
            nextBtn.toggleClass('disabled', true);
          }
        }
      }
function showDocumentState(show) {
      showPrevNextCont(!show);
      showDocsInfoCont(!show);
      showItemsPerPage(!show);
      allDocsCont[show ? 'hide' : 'show']();
      currenDocCont[show ? 'show' : 'hide']();
      showCodeEditor(!show);
    }
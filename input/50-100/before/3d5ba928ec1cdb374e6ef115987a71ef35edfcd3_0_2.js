function showDocumentState(show) {
      showPrevNextCont(!show);
      allDocsCont[show ? 'hide' : 'show']();
      currenDocCont[show ? 'show' : 'hide']();
      showCodeEditor(!show);
    }
function pdfViewSetupBeforePrint() {
    if (!this.supportsPrinting) {
      var printMessage = mozL10n.get('printing_not_supported', null,
          'Warning: Printing is not fully supported by this browser.');
      this.error(printMessage);
      return;
    }
    var body = document.querySelector('body');
    body.setAttribute('data-mozPrintCallback', true);
    for (var i = 0, ii = this.pages.length; i < ii; ++i) {
      this.pages[i].beforePrint();
    }
  }
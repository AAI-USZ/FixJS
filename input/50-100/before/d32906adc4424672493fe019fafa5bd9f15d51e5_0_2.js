function pdfViewSetupBeforePrint() {
    if (!this.supportsPrinting) {
      var printMessage = mozL10n.get('printing_not_supported', null,
                         'Warning: Printing is not supported by this browser.');
      alert(printMessage);
      return;
    }
    for (var i = 0, ii = this.pages.length; i < ii; ++i) {
      this.pages[i].beforePrint();
    }
  }
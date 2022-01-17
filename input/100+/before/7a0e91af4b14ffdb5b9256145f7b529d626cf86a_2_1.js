function pdfViewOpen(url, scale, password) {
    var parameters = {password: password};
    if (typeof url === 'string') { // URL
      this.url = url;
      document.title = decodeURIComponent(getFileName(url)) || url;
      parameters.url = expandUrl(url);
    } else if (url && 'byteLength' in url) { // ArrayBuffer
      parameters.data = url;
    }

    if (!PDFView.loadingBar) {
      PDFView.loadingBar = new ProgressBar('#loadingBar', {});
    }

    this.pdfDocument = null;
    var self = this;
    self.loading = true;
    PDFJS.getDocument(parameters).then(
      function getDocumentCallback(pdfDocument) {
        self.load(pdfDocument, scale);
        self.loading = false;
      },
      function getDocumentError(message, exception) {
        if (exception && exception.name === 'PasswordException') {
          if (exception.code === 'needpassword') {
            var promptString = mozL10n.get('request_password', null,
                                      'PDF is protected by a password:');
            password = prompt(promptString);
            if (password && password.length > 0) {
              return PDFView.open(url, scale, password);
            }
          }
        }

        var loadingIndicator = document.getElementById('loading');
        loadingIndicator.textContent = mozL10n.get('loading_error_indicator',
          null, 'Error');
        var moreInfo = {
          message: message
        };
        self.error(mozL10n.get('loading_error', null,
          'An error occurred while loading the PDF.'), moreInfo);
        self.loading = false;
      },
      function getDocumentProgress(progressData) {
        self.progress(progressData.loaded / progressData.total);
      }
    );
  }
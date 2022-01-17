function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    this.doDownload();
                    // doUpload all information
                }
            }
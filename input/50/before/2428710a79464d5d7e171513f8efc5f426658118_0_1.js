function (resp) {
                if (resp === 'yes') {
                    // TODO: check for conflicts
                    // doDownload information in localStorage
                    helper.doDownload();
                    // doUpload all information
                }
            }
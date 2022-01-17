function() {
            sakai.api.Util.progressIndicator.showProgressIndicator(sakai.api.i18n.getValueForKey('UPLOADING_YOUR_CONTENT'), sakai.api.i18n.getValueForKey('PROCESSING_UPLOAD'));
            libraryToUploadTo = $(newaddcontentSaveTo).val();
            $.each(itemsToUpload, function(index,item) {
                switch(item.type) {
                    case 'link':
                        uploadLink(item);
                        break;
                    case 'content':
                        if (!contentUploaded) {
                            uploadContent();
                            contentUploaded = true;
                        }
                        break;
                    case 'document':
                        createDocument(item);
                        break;
                    case 'existing':
                        addToLibrary(item);
                        break;
                }
            });
        }
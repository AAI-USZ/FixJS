function() {
            sakai.api.Util.progressIndicator.showProgressIndicator(sakai.api.i18n.getValueForKey('UPLOADING_YOUR_CONTENT'), sakai.api.i18n.getValueForKey('PROCESSING_UPLOAD'));
            libraryToUploadTo = $(newaddcontentSaveTo).val();
            if(numberOfBrowsedFiles < $('.MultiFile-list').children().length) {
                // Remove the previously added file to avoid https://jira.sakaiproject.org/browse/SAKIII-3269
                $('.MultiFile-list').children().last().find('a').click();
            }
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
                    case 'dropped':
                        uploadDropped(item);
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
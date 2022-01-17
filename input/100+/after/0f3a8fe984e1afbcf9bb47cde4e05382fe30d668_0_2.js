function(item) {
                    if (sakai.api.Content.Collections.isCollection(item)) {
                        sakai.api.Content.Collections.shareCollection(item['_path'], libraryToUploadTo, false, function() {
                            item['sakai:pooled-content-viewer'] = item['sakai:pooled-content-viewer'] || [];
                            item['sakai:pooled-content-viewer'].push(libraryToUploadTo);
                            lastUpload.push(item);
                            checkUploadCompleted(false, existingItem);
                        });
                    } else {
                        // Don't make the authorizable a viewer if it's already part of the library
                        if (!sakai.api.Content.isContentInLibrary(item, libraryToUploadTo)) {
                            sakai.api.Content.addToLibrary(item['_path'], libraryToUploadTo, false, function() {
                                item['sakai:pooled-content-viewer'] = item['sakai:pooled-content-viewer'] || [];
                                item['sakai:pooled-content-viewer'].push(libraryToUploadTo);
                                lastUpload.push(item);
                                checkUploadCompleted(false, existingItem);
                            });
                        } else {
                            existingAdded.push(item);
                            checkUploadCompleted(false, existingItem);
                        }
                    }
                }
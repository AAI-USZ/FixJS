function() {
                                item['sakai:pooled-content-viewer'] = item['sakai:pooled-content-viewer'] || [];
                                item['sakai:pooled-content-viewer'].push(libraryToUploadTo);
                                lastUpload.push(item);
                                checkUploadCompleted();
                            }
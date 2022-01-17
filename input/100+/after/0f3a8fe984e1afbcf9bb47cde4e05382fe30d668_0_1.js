function(files, contentObj) {
            itemsUploaded++;
            if(itemsToUpload.length === itemsUploaded) {
            
                sakai.data.me.user.properties.contentCount += itemsUploaded;
                var itemsAdded = $.extend(true, [], existingAdded);
                
                // Variables passed to 'Content Added' Notification Template
                var libraryTitle = $(newaddcontentSaveTo + ' option:selected').text();
                var uploadToCollection = false;
                var notificationHeading = '';
                var contentFileName = $.trim(contentObj['sakai:pooled-content-file-name-short']) || 
                    $.trim(contentObj['sakai:pooled-content-file-name']);
                var contentURL = '/content#p='+ contentObj['_path'] + '/' + contentFileName;
                
                $.merge(itemsAdded, lastUpload);
                $(window).trigger('done.newaddcontent.sakai', [itemsAdded, libraryToUploadTo]);
                
                // If adding to a group library or collection, these will also still be added to my library
                if (libraryToUploadTo !== sakai.data.me.user.userid) {
                    brandNewContent[sakai.data.me.user.userid] = brandNewContent[sakai.data.me.user.userid] || [];
                    _.uniq($.merge(brandNewContent[sakai.data.me.user.userid], lastUpload));
                }
                
                brandNewContent[libraryToUploadTo] = brandNewContent[libraryToUploadTo] || [];
                _.uniq($.merge(brandNewContent[libraryToUploadTo], lastUpload));
                _.uniq($.merge(allNewContent, lastUpload));
                lastUpload = [];
                sakai.api.Util.Modal.close($newaddcontentContainer);
                sakai.api.Util.progressIndicator.hideProgressIndicator();

                // Set variables to send to template, based on whether we're uploading to a Collection or a library
                if (sakai.api.Content.Collections.isCollection(libraryToUploadTo)) {
                    notificationHeading = sakai.api.i18n.getValueForKey('COLLECTION');
                    libraryToUploadTo = libraryToUploadTo.substring(2);
                    uploadToCollection = true;
                }
                else {
                    notificationHeading = sakai.api.i18n.getValueForKey('LIBRARY');
                }

                sakai.api.Util.notification.show(notificationHeading, 
                    sakai.api.Util.TemplateRenderer('newaddcontent_notification_finished_template', {
                        sakai: sakai,
                        me: sakai.data.me,
                        libraryid: libraryToUploadTo,
                        librarytitle: libraryTitle,
                        uploadcount: itemsUploaded,
                        contenttitle: contentFileName,
                        contenturl: contentURL,
                        uploadtocollection: uploadToCollection
                    }));
            }
        }
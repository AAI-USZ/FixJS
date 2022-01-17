function(files) {
            itemsUploaded++;
            if(itemsToUpload.length === itemsUploaded) {
                sakai.data.me.user.properties.contentCount += itemsUploaded;
                var tmpItemsAdded = $.extend(true, [], existingAdded);
                var itemsAdded = [];
                $.merge(tmpItemsAdded, lastUpload);
                // SAKIII-5583 Filter out items that cannot be shared (and were not shared)
                $.each(tmpItemsAdded, function(index, item) {
                    if (sakai.api.Content.canCurrentUserShareContent(item)) {
                        itemsAdded.push(item);
                    }
                });
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
                var librarytitle = $(newaddcontentSaveTo + ' option:selected').text();
                if (sakai.api.Content.Collections.isCollection(libraryToUploadTo)) {
                    sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('COLLECTION'), sakai.api.Util.TemplateRenderer('newaddcontent_notification_collection_finished_template', {
                        collectionid: libraryToUploadTo.substring(2),
                        collectiontitle: librarytitle
                    }));
                } else {
                    sakai.api.Util.notification.show(sakai.api.i18n.getValueForKey('LIBRARY'), sakai.api.Util.TemplateRenderer('newaddcontent_notification_finished_template', {
                        sakai: sakai,
                        me: sakai.data.me,
                        libraryid: libraryToUploadTo,
                        librarytitle: librarytitle
                    }));
                }
            }
        }